# DairyDan recommender

Optional Python/FastAPI microservice for the milk yield recommender.
Not required for the Node/Express core — only set up if/when you move the
recommender logic out of the main backend.

```
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn pandas
```

Design reference:
- Primary: 7-session moving average forecaster (needs 3+ milking records)
- Cold start: FAO breed-based lookup (see `breed_yield_baselines` table)
- Anomaly band: 80-120% of the moving average, with health-aware suppression
