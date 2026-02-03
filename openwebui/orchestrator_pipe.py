"""
Project Orchestrator Pipe for Open WebUI
Forwards backslash commands to n8n webhook
"""

from typing import Optional
from pydantic import BaseModel, Field
import requests

class Pipe:
    class Valves(BaseModel):
        n8n_url: str = Field(
            default="",
            description="n8n webhook URL (required)"
        )
        input_field: str = Field(
            default="chatInput",
            description="JSON field for input"
        )
        response_field: str = Field(
            default="response",
            description="JSON field for response"
        )

    def __init__(self):
        self.valves = self.Valves()

    def pipe(self, body: dict) -> str:
        messages = body.get("messages", [])
        if not messages:
            return "No messages"

        msg = messages[-1].get("content", "")
        
        if not msg.startswith("\"):
            return None  # Not a command
        
        if not self.valves.n8n_url:
            return "Error: n8n_url not configured"

        try:
            resp = requests.post(
                self.valves.n8n_url,
                json={self.valves.input_field: msg},
                timeout=30
            )
            data = resp.json()
            return data.get(self.valves.response_field, str(data))
        except Exception as e:
            return f"Error: {str(e)}"
