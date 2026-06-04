import Card from '@/components/ui/Card'

export function Quickstart() {
  return (
    <Card padding="lg">
      <h2 className="text-foreground font-semibold mb-4">Quickstart</h2>
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Guest tier (no wallet)</p>
          <pre className="bg-card rounded-xl p-4 text-xs text-foreground overflow-x-auto leading-relaxed font-mono">
            <code>{`curl -fsSL https://pay.sh/install | sh
pay curl https://gateway.chaoscompute.io/v1/chat/completions \\
  -H 'content-type: application/json' \\
  -d '{"model":"gpt-5.5","messages":[...]}'`}</code>
          </pre>
        </div>
        <div className="border-t border-border pt-4">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Builder+ tier (with wallet connect)</p>
          <pre className="bg-card rounded-xl p-4 text-xs text-foreground overflow-x-auto leading-relaxed font-mono">
            <code>{`from openai import OpenAI
from chaos_sdk import ChaosSigner

signer = ChaosSigner("YOUR_WALLET_KEY")
client = OpenAI(
    base_url="https://gateway.chaoscompute.io/v1",
    api_key=signer.token(),
)
response = client.chat.completions.create(
    model="gpt-5.5",
    messages=[{"role":"user","content":"Hello"}]
)`}</code>
          </pre>
        </div>
      </div>
    </Card>
  )
}
