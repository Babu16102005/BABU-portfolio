# NVIDIA API — Working Free Chat Models

**API Key:** `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`
**Base URL:** `https://integrate.api.nvidia.com/v1`

## ✅ Working Models

| Model | Quality | Speed | Notes |
|-------|---------|-------|-------|
| `meta/llama-3.1-8b-instruct` | High | Fast | Best all-rounder, recommended |
| `meta/llama-3.1-70b-instruct` | Very High | Medium | Higher quality, slower |
| `meta/llama-3.2-3b-instruct` | Medium | Fastest | Good for simple responses |
| `mistralai/mistral-nemotron` | High | Fast | Good alternative |
| `mistralai/mixtral-8x7b-instruct-v0.1` | High | Medium | Mixture of experts |
| `google/gemma-2-2b-it` | Low | Fast | Small model, basic use |
| `minimaxai/minimax-m3` | High | Medium | Modern model |

## ❌ Not Working

| Model | Error |
|-------|-------|
| `z-ai/glm-5.2` | Timeout (no response) |
| `deepseek-ai/deepseek-v4-flash` | Timeout |
| `meta/llama-3.3-70b-instruct` | Timeout |
| `meta/llama-4-maverick-17b-128e-instruct` | Timeout |
| `qwen/qwen3-next-80b-a3b-instruct` | Timeout |
| `stepfun-ai/step-3.7-flash` / `step-3.5-flash` | Timeout |
| `bytedance/seed-oss-36b-instruct` | Timeout |
| `mistralai/mistral-large` | 404 (not accessible with this key) |
| `mistralai/mistral-large-2-instruct` | 404 |
| `microsoft/phi-3.5-moe-instruct` | 404 |
| `01-ai/yi-large` | 404 |

**Recommendation:** Use `meta/llama-3.1-8b-instruct` for best balance of quality and speed.
