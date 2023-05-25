import requests
import json

from pathlib import Path
from numpy import round

from datetime import datetime

import pandas as pd

from fastapi import FastAPI, APIRouter, Query, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.wsgi import WSGIMiddleware

from app.templates.static.dash.dashapp import create_dash_app

from fastapi.responses import FileResponse

import matplotlib.pyplot as plt
import seaborn as sns

_BASE_PATH = Path(__file__).resolve().parent

app = FastAPI(
    title="Example IEA Data Explorer", openapi_url="/openapi.json"
)

app.mount(
    "/static",
    StaticFiles(directory=str(str(Path(__file__).parent.absolute()))+"/app/templates/static", html=True),
    name="static",
)
_DIR_TEMPLATE = "/app/templates"
templates = Jinja2Templates(directory=str(Path(__file__).parent.absolute())+_DIR_TEMPLATE)

api_router = APIRouter()


@api_router.get("/data-and-statistics/data-tools/{dataset}-data-explorer", status_code=200)
async def explore_dataset(request: Request, dataset: str):

    with open('./app/templates/static/data_explorer_content.json') as json_file:

        content_json = json.load(json_file)

    payload = {"request": request,
         "dataset": dataset.replace('-', ' ').title(),
         "routes": [
             {"method": "GET", "path": "/", "summary": "Landing"},
             {"method": "GET", "path": "/status", "summary": "App status"},
             {"method": "GET", "path": "/dash", "summary": "Sub-mounted Dash application"},
         ],
         }
    payload.update(content_json)

    return templates.TemplateResponse(
       "Renewables Data Explorer – Data Tools - IEA.html", payload)


dash_app = create_dash_app(requests_pathname_prefix="/dash/")
app.mount("/dash", WSGIMiddleware(dash_app.server))
app.include_router(api_router)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="localhost", port=8002, log_level="debug")

