#!/bin/bash
# Wrapper MCP Trello: usa il Node installato dal pacchetto ufficiale
exec /usr/local/bin/npx -y -p "@delorenj/mcp-server-trello" mcp-server-trello
