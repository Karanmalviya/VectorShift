from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    

    adj = defaultdict(list)
    for edge in edges:
        adj[edge['source']].append(edge['target'])
    
    visited = set()
    rec_stack = set()
    
    def has_cycle(u):
        visited.add(u)
        rec_stack.add(u)
        for v in adj[u]:
            if v not in visited:
                if has_cycle(v):
                    return True
            elif v in rec_stack:
                return True
        rec_stack.remove(u)
        return False

    is_dag = True
    for node in nodes:
        node_id = node['id']
        if node_id not in visited:
            if has_cycle(node_id):
                is_dag = False
                break
                
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
