/**
 * @deprecated Replaced by pay.sh HTTP 402 payment layer.
 * Wallet connect is now handled by pay.sh's CLI (pay curl, pay whoami).
 * See chaoscompute.yaml for the pay.sh provider spec.
 */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

const truncated = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`

interface WalletContextType {
  connected: boolean
  connecting: boolean
  publicKey: string | null
  balance: number | null
  connect: () => void
  disconnect: () => void
  select: (wallet: string) => void
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  connecting: false,
  publicKey: null,
  balance: null,
  connect: () => {},
  disconnect: () => {},
  select: () => {},
})

export function useWallet() {
  return useContext(WalletContext)
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const connect = useCallback(async () => {
    setConnecting(true)
    try {
      if (typeof window === 'undefined') return
      if (!selectedWallet) {
        // Try auto-connecting to any installed wallet
        if ((window as any).phantom?.solana) {
          const resp = await (window as any).phantom.solana.connect()
          setPublicKey(resp.publicKey.toString())
          setConnected(true)
          return
        }
        if ((window as any).solflare) {
          await (window as any).solflare.connect()
          setPublicKey((window as any).solflare.publicKey.toString())
          setConnected(true)
          return
        }
        // No wallet found
        return
      }
      // Specific wallet selected
      const provider = (window as any)[selectedWallet]
      if (provider?.solana) {
        const resp = await provider.solana.connect()
        setPublicKey(resp.publicKey.toString())
        setConnected(true)
      }
    } catch (err) {
      console.error('Wallet connect failed:', err)
    } finally {
      setConnecting(false)
    }
  }, [selectedWallet])

  const disconnect = useCallback(() => {
    setConnected(false)
    setPublicKey(null)
    setBalance(null)
  }, [])

  const select = useCallback((wallet: string) => {
    setSelectedWallet(wallet)
  }, [])

  // Auto-connect on mount
  useEffect(() => {
    const autoConnect = localStorage.getItem('chaos_wallet_autoconnect')
    if (autoConnect) {
      connect()
    }
  }, [])

  // Persist auto-connect preference
  useEffect(() => {
    if (connected) {
      localStorage.setItem('chaos_wallet_autoconnect', 'true')
    } else if (!connecting) {
      localStorage.removeItem('chaos_wallet_autoconnect')
    }
  }, [connected, connecting])

  return (
    <WalletContext.Provider value={{ connected, connecting, publicKey, balance, connect, disconnect, select }}>
      {children}
    </WalletContext.Provider>
  )
}
