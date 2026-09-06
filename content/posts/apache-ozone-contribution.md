---
title: "apache ozone contribution"
description: "Apache Ozone 及其周邊專案（ozone-site、ozone-helm-charts）的貢獻紀錄，含已合併與進行中的 PR。"
publishDate: "2026-09-06T00:00:00+08:00"
tags: ["open-source"]
---

開源貢獻紀錄，更新於 2026-09-06。這裡只列 Apache Ozone 相關的貢獻。

## Merged

依合併日期由新到舊排序。

| Repo | PR | Title | 狀態 |
| --- | --- | --- | --- |
| apache/ozone | [#11191](https://github.com/apache/ozone/pull/11191) | **HDDS-16373. Fix InterSCMGrpcClient checkpoint download deadline unit**<br><small>修正 SCM 之間下載 checkpoint 的逾時時間單位錯誤。</small> | <span class="status">✅ Merged<br><small>2026-09-02</small></span> |
| apache/ozone-site | [#540](https://github.com/apache/ozone-site/pull/540) | **HDDS-16157. Add security issue report process**<br><small>官網補上資安問題的回報流程說明。</small> | <span class="status">✅ Merged<br><small>2026-09-02</small></span> |
| apache/ozone | [#11115](https://github.com/apache/ozone/pull/11115) | **HDDS-16256. Avoid the per-group list copy in OMKeyRequest.filterOutBlocksStillInUse**<br><small>移除逐組的 list 複製，降低刪除路徑的記憶體配置。</small> | <span class="status">✅ Merged<br><small>2026-08-31</small></span> |
| apache/ozone | [#11116](https://github.com/apache/ozone/pull/11116) | **HDDS-16257. Avoid the flatten-copy in OmMetadataManagerImpl.getExpiredOpenKeys' hsync branch**<br><small>hsync 分支不再攤平複製整份清單。</small> | <span class="status">✅ Merged<br><small>2026-08-31</small></span> |
| apache/ozone | [#11144](https://github.com/apache/ozone/pull/11144) | **HDDS-16322. ConfigurationSource.getClass loads property key instead of configured class name**<br><small>修正誤把 property key 當成類別名稱載入的問題。</small> | <span class="status">✅ Merged<br><small>2026-08-28</small></span> |
| apache/ozone | [#11125](https://github.com/apache/ozone/pull/11125) | **HDDS-16298. ECBlockChecksumComputer.computeMd5Crc calls MessageDigest.digest() twice and returns empty MD5**<br><small>修正重複呼叫 digest() 導致 EC 區塊 MD5 為空。</small> | <span class="status">✅ Merged<br><small>2026-08-28</small></span> |
| apache/ozone-site | [#534](https://github.com/apache/ozone-site/pull/534) | **HDDS-16234. Favicon missing on all non-root pages**<br><small>修正非根路徑頁面缺少 favicon。</small> | <span class="status">✅ Merged<br><small>2026-08-27</small></span> |
| apache/ozone | [#11101](https://github.com/apache/ozone/pull/11101) | **HDDS-11355. Remove Flaky tag from testMultiBlockWritesWithIntermittentDnFailures**<br><small>確認測試已穩定後移除 Flaky 標記。</small> | <span class="status">✅ Merged<br><small>2026-08-25</small></span> |
| apache/ozone | [#11048](https://github.com/apache/ozone/pull/11048) | **HDDS-1159. Fix flaky testGetMatchingContainerMultipleThreads**<br><small>修正多執行緒容器配對測試的不穩定。</small> | <span class="status">✅ Merged<br><small>2026-08-23</small></span> |
| apache/ozone | [#11064](https://github.com/apache/ozone/pull/11064) | **HDDS-16205. Avoid the duplicate list copy in S3MultipartUploadCompleteRequest.getMultipartDataSize**<br><small>移除分段上傳完成流程中重複的 list 複製。</small> | <span class="status">✅ Merged<br><small>2026-08-23</small></span> |
| apache/ozone | [#11081](https://github.com/apache/ozone/pull/11081) | **HDDS-16249. Fix no-op assertThat in TestOzoneClientRetriesOnExceptions**<br><small>修正沒有實際驗證效果的 assertThat。</small> | <span class="status">✅ Merged<br><small>2026-08-22</small></span> |
| apache/ozone | [#11038](https://github.com/apache/ozone/pull/11038) | **HDDS-16202. Avoid the list copy in ContainerEndpoint.getBlocks**<br><small>移除 Recon 取得 block 清單時的多餘複製。</small> | <span class="status">✅ Merged<br><small>2026-08-20</small></span> |
| apache/ozone | [#11047](https://github.com/apache/ozone/pull/11047) | **HDDS-16204. Avoid the per-group list copy in ContainerToKeyMapping.getContainers**<br><small>移除 container 對 key 映射的逐組 list 複製。</small> | <span class="status">✅ Merged<br><small>2026-08-20</small></span> |
| apache/ozone | [#10899](https://github.com/apache/ozone/pull/10899) | **HDDS-16004. Return NotImplemented for GetObjectTorrent instead of GetObject body**<br><small>S3 GetObjectTorrent 改回傳 NotImplemented，不再誤傳物件內容。</small> | <span class="status">✅ Merged<br><small>2026-08-06</small></span> |
| apache/ozone-helm-charts | [#48](https://github.com/apache/ozone-helm-charts/pull/48) | **HDDS-14351. Add preStop and graceful termination for OM and SCM**<br><small>為 OM/SCM 加上 preStop 與優雅關機設定。</small> | <span class="status">✅ Merged<br><small>2026-08-03</small></span> |
| apache/ozone-helm-charts | [#52](https://github.com/apache/ozone-helm-charts/pull/52) | **HDDS-15994. Update Helm Chart to use Ozone 2.2.0**<br><small>Helm Chart 升級至 Ozone 2.2.0。</small> | <span class="status">✅ Merged<br><small>2026-07-31</small></span> |
| apache/ozone-helm-charts | [#45](https://github.com/apache/ozone-helm-charts/pull/45) | **HDDS-13828. Verify number of replicas for om and scm**<br><small>測試中加入 OM/SCM 副本數的驗證。</small> | <span class="status">✅ Merged<br><small>2026-07-25</small></span> |
| apache/ozone-helm-charts | [#39](https://github.com/apache/ozone-helm-charts/pull/39) | **HDDS-14803. Update Helm Chart to use Ozone 2.1.1**<br><small>Helm Chart 升級至 Ozone 2.1.1。</small> | <span class="status">✅ Merged<br><small>2026-07-14</small></span> |

## Open

依開啟日期由新到舊排序。

| Repo | PR | Title | 狀態 |
| --- | --- | --- | --- |
| apache/ozone | [#11202](https://github.com/apache/ozone/pull/11202) | **HDDS-16135. Fix remaining intermittent failures in TestKeyLifecycleService**<br><small>修正 TestKeyLifecycleService 殘餘的間歇性失敗。</small> | <span class="status">⏳ Open<br><small>2026-09-04</small></span> |
| apache/ozone | [#11198](https://github.com/apache/ozone/pull/11198) | **HDDS-16378. Do not write upgrade.complete during upgrade-container-schema --dry-run**<br><small>dry-run 模式下不應寫入 upgrade.complete 標記。</small> | <span class="status">⏳ Open<br><small>2026-09-03</small></span> |
| apache/ozone | [#11193](https://github.com/apache/ozone/pull/11193) | **HDDS-16374. Use the datanode-specific block deletion interval during reconfiguration**<br><small>重新配置時改用 datanode 專屬的區塊刪除間隔。</small> | <span class="status">⏳ Open<br><small>2026-09-02</small></span> |
| apache/ozone | [#11183](https://github.com/apache/ozone/pull/11183) | **HDDS-16338. Fix no-op table size assertions in TestHSync**<br><small>修正 TestHSync 中沒有實際驗證效果的表格大小斷言。</small> | <span class="status">⏳ Open<br><small>2026-09-01</small></span> |
| apache/ozone | [#11160](https://github.com/apache/ozone/pull/11160) | **HDDS-16336. S3 GET inverted Range with start inside object yields negative Content-Length**<br><small>修正反向 Range 請求導致 Content-Length 為負數。</small> | <span class="status">⏳ Open<br><small>2026-08-30</small></span> |
| apache/ozone-site | [#541](https://github.com/apache/ozone-site/pull/541) | **HDDS-15790. Add AGENTS.md and CLAUDE.md**<br><small>為官網原始碼庫補上 AGENTS.md 與 CLAUDE.md。</small> | <span class="status">⏳ Open<br><small>2026-08-25</small></span> |
| apache/ozone | [#11100](https://github.com/apache/ozone/pull/11100) | **HDDS-16255. Avoid the per-group list copy in ContainerMapper.parseOmDB**<br><small>移除 parseOmDB 的逐組 list 複製。</small> | <span class="status">⏳ Open<br><small>2026-08-24</small></span> |
| apache/ozone | [#11090](https://github.com/apache/ozone/pull/11090) | **HDDS-16253. Fix getPipelines() in Recon always returning an empty pipeline list**<br><small>修正 Recon 的 getPipelines() 永遠回傳空清單。</small> | <span class="status">⏳ Open<br><small>2026-08-22</small></span> |
| apache/ozone-site | [#535](https://github.com/apache/ozone-site/pull/535) | **HDDS-16237. Chinese versioned docs are missing all local images in vendored HTML pages**<br><small>修正中文版文件的 HTML 頁面遺失所有本地圖片。</small> | <span class="status">⏳ Open<br><small>2026-08-20</small></span> |
| apache/ozone | [#11029](https://github.com/apache/ozone/pull/11029) | **HDDS-11646. Intermittent timeout in TestXceiverClientMetrics**<br><small>修正 TestXceiverClientMetrics 的間歇性逾時。</small> | <span class="status">⏳ Open<br><small>2026-08-16</small></span> |
| apache/ozone-helm-charts | [#56](https://github.com/apache/ozone-helm-charts/pull/56) | **HDDS-16172. Fix OM scale-up by moving bootstrap into the om container**<br><small>將 bootstrap 移入 om container 以修正 OM 擴容。</small> | <span class="status">⏳ Open<br><small>2026-08-15</small></span> |
| apache/ozone-helm-charts | [#53](https://github.com/apache/ozone-helm-charts/pull/53) | **HDDS-15993. Unused values in ozone helm chart values.yaml**<br><small>清理 values.yaml 中未被使用的設定值。</small> | <span class="status">⏳ Open<br><small>2026-07-29</small></span> |
| apache/ozone | [#10873](https://github.com/apache/ozone/pull/10873) | **HDDS-15913. Extract common Kerberos/MiniKDC setup from serveral tests**<br><small>抽出多個測試共用的 Kerberos/MiniKDC 設定。</small> | <span class="status">⏳ Open<br><small>2026-07-26</small></span> |
| apache/ozone-helm-charts | [#43](https://github.com/apache/ozone-helm-charts/pull/43) | **HDDS-15874. Adding readinessProbe for helm HA deployments**<br><small>為 HA 部署加上 readinessProbe。</small> | <span class="status">⏳ Open<br><small>2026-07-16</small></span> |
| apache/ozone-helm-charts | [#42](https://github.com/apache/ozone-helm-charts/pull/42) | **HDDS-14349. Adding startupProbe for helm HA deployments**<br><small>為 HA 部署加上 startupProbe。</small> | <span class="status">⏳ Open<br><small>2026-07-16</small></span> |
