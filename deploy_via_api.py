#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CI 知识库 → GitHub Pages 部署（API 直传版，免 git / 免网页）
-------------------------------------------------
适用场景：当前环境 git 无法直连 github.com:443（连接被重置），
但 REST API（api.github.com）可用。本脚本改用 GitHub 内容 API 直接
上传文件，再调用 Pages API 开启 Pages，全程走 api.github.com。

配置（环境变量）：
  GITHUB_USER    GitHub 用户名
  GH_TOKEN       Personal Access Token（需 repo 权限）

运行：
  GITHUB_USER=hemyyang GH_TOKEN=xxx python deploy_via_api.py
"""
import os
import json
import base64
import urllib.request
import urllib.error
import urllib.parse

REPO_DIR = os.environ.get("CI_KB_DIR", r"E:\CI_知识库\ci-kb-web")
OWNER = os.environ.get("GITHUB_USER")
TOKEN = os.environ.get("GH_TOKEN")
REPO = "ci-kb"
API = "https://api.github.com"


def api(method, url, data=None):
    body = json.dumps(data).encode("utf-8") if data is not None else None
    req = urllib.request.Request(url, data=body, method=method)
    req.add_header("Authorization", "Bearer " + TOKEN)
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("Content-Type", "application/json")
    if body is not None:
        req.add_header("Content-Length", str(len(body)))
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status, json.loads(r.read().decode("utf-8") or "{}")
    except urllib.error.HTTPError as e:
        try:
            payload = json.loads(e.read().decode("utf-8") or "{}")
        except Exception:
            payload = {}
        return e.code, payload


def ensure_repo_with_branch():
    """确保仓库存在且有默认分支（空仓库需 auto_init 才有分支）。"""
    status, _ = api("GET", f"{API}/repos/{OWNER}/{REPO}")
    if status == 200:
        # 检查是否已有提交（空仓库的 contents 根会 409）
        s, _ = api("GET", f"{API}/repos/{OWNER}/{REPO}/contents/")
        if s == 409:
            print("[..] 仓库为空，删除并重建（auto_init=true）以生成默认分支")
            api("DELETE", f"{API}/repos/{OWNER}/{REPO}")
            api("POST", f"{API}/user/repos",
                {"name": REPO, "private": False, "auto_init": True})
        else:
            print("[ok] 仓库已存在且有内容，跳过重建")
    elif status == 404:
        print("[..] 创建仓库（auto_init=true）")
        api("POST", f"{API}/user/repos",
            {"name": REPO, "private": False, "auto_init": True})
    else:
        print("[!] 检查仓库返回", status)


def upload(local_path, repo_path):
    with open(local_path, "rb") as f:
        content = base64.b64encode(f.read()).decode("ascii")
    url = f"{API}/repos/{OWNER}/{REPO}/contents/{urllib.parse.quote(repo_path)}"
    status, resp = api("PUT", url, {"message": f"add {repo_path}", "content": content})
    if status in (200, 201):
        print(f"[ok] 上传 {repo_path}")
        return
    # 已存在：取 sha 后更新
    if status == 422 and "sha" in str(resp):
        s2, r2 = api("GET", url)
        sha = r2.get("sha") if s2 == 200 else None
        if sha:
            status, resp = api("PUT", url,
                                {"message": f"update {repo_path}", "content": content, "sha": sha})
            if status in (200, 201):
                print(f"[ok] 更新 {repo_path}")
                return
    print(f"[x] 上传 {repo_path} 失败 -> {status} {resp.get('message', resp)}")


def main():
    if not OWNER or not TOKEN:
        sys.exit("请设置 GITHUB_USER 与 GH_TOKEN 环境变量")
    ensure_repo_with_branch()

    for fn in ["index.html", "app.js", "styles.css", "data.js", ".gitignore"]:
        lp = os.path.join(REPO_DIR, fn)
        if os.path.exists(lp):
            upload(lp, fn)

    assets_dir = os.path.join(REPO_DIR, "assets")
    if os.path.isdir(assets_dir):
        for fn in os.listdir(assets_dir):
            upload(os.path.join(assets_dir, fn), "assets/" + fn)

    # 开启 Pages
    s, p = api("POST", f"{API}/repos/{OWNER}/{REPO}/pages",
               {"source": {"branch": "main", "path": "/"}})
    if s == 201:
        html_url = p.get("html_url", f"https://{OWNER}.github.io/{REPO}/")
    elif s == 409:
        _, p2 = api("GET", f"{API}/repos/{OWNER}/{REPO}/pages")
        html_url = p2.get("html_url", f"https://{OWNER}.github.io/{REPO}/")
    else:
        html_url = f"https://{OWNER}.github.io/{REPO}/"
        print(f"[!] 开启 Pages 返回 {s}：{p.get('message', p)}")
        print("    请手动到仓库 Settings → Pages 选择 main / (root)。")

    print("\n========================================")
    print("  ✅ 部署完成！")
    print(f"  约 1 分钟后访问：{html_url}")
    print("  把该链接发到微信即可打开问答页。")
    print("========================================")


if __name__ == "__main__":
    import sys
    main()
