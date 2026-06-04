import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import Card from '@/components/ui/Card'
import { Wallet } from 'lucide-react'

interface WalletState {
  connected: boolean
  address: string | null
  amount: number
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletState>({
  connected: false, address: null, amount: 0,
  connect: () => {}, disconnect: () => {},
})

export function useWallet() { return useContext(WalletContext) }

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [amount, setAmount] = useState(0)

  const connect = useCallback(async () => {
    try {
      if ((window as any).phantom?.solana) {
        const resp = await (window as any).phantom.solana.connect()
        const pubKey = resp.publicKey.toString()
        setAddress(pubKey)
        setConnected(true)
        const connection = new ((await import('@solana/web3.js')).Connection)('https://api.devnet.solana.com')
        const balance = await connection.getBalance(new ((await import('@solana/web3.js')).PublicKey)(pubKey))
        setAmount(balance / 1e9)
      }
    } catch (err) { console.error('Wallet connect failed:', err) }
  }, [])

  const disconnect = useCallback(() => {
    setConnected(false); setAddress(null); setAmount(0)
  }, [])

  return (
    <WalletContext.Provider value={{ connected, address, amount, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function WalletConnect() {
  const { connected, address, connect, disconnect } = useWallet()
  return (
    <Card padding="lg" className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${connected ? 'bg-success/20 text-success' : 'bg-surface-hover text-muted-foreground'}`}>
          <Wallet size={16} aria-hidden="true" />
        </div>
        <div>
          <p className="text-foreground font-medium text-sm">{connected ? 'Connected' : 'Not connected'}</p>
          {connected && address && <p className="text-muted-foreground text-xs font-mono">{address.slice(0, 6)}...{address.slice(-4)}</p>}
        </div>
      </div>
      {connected ? (
        <button onClick={disconnect} className="text-xs text-muted-foreground hover:text-foreground motion-safe:transition-colors px-3 py-1 rounded-full border border-border hover:border-border hover:bg-surface-hover">
          Disconnect
        </button>
      ) : (
        <button onClick={connect} className="text-xs text-foreground bg-foreground text-background rounded-full px-4 py-2 font-medium hover:opacity-90 motion-safe:transition-opacity">
          Connect Phantom
        </button>
      )}
    </Card>
  )
}
