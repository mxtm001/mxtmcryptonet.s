"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { userService } from "@/lib/user-service"

export default function WithdrawPage() {
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const balance = 5500000

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const withdrawalAmount = Number.parseFloat(amount)
      if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
        setResult({ success: false, message: "Bitte geben Sie einen gültigen Betrag ein." })
        return
      }

      if (withdrawalAmount > balance) {
        setResult({ success: false, message: "Unzureichendes Guthaben." })
        return
      }

      const response = await userService.processWithdrawal(withdrawalAmount, method)
      setResult(response)

      if (response.success) {
        setAmount("")
        setMethod("")
        setAddress("")
      }
    } catch (error) {
      setResult({ success: false, message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Auszahlung</h1>
        <p className="text-muted-foreground">Geld von Ihrem Konto abheben</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Verfügbares Guthaben</CardTitle>
            <CardDescription>Ihr aktuelles Guthaben für Auszahlungen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(balance)}</div>
            <p className="text-sm text-muted-foreground mt-2">Verfügbar zum Abheben</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Auszahlungsinformationen</CardTitle>
            <CardDescription>Bearbeitungszeiten und Gebühren</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Bearbeitungszeit:</span>
              <span className="font-medium">1-3 Werktage</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Mindestbetrag:</span>
              <span className="font-medium">{formatCurrency(50)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Gebühr:</span>
              <span className="font-medium">2%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Auszahlungsantrag</CardTitle>
          <CardDescription>Füllen Sie die Details für Ihre Auszahlung aus</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Betrag (EUR)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Betrag eingeben"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="50"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="method">Auszahlungsmethode</Label>
              <Select value={method} onValueChange={setMethod} required>
                <SelectTrigger>
                  <SelectValue placeholder="Methode wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                  <SelectItem value="usdt">Tether (USDT)</SelectItem>
                  <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                  <SelectItem value="bnb">Binance Coin (BNB)</SelectItem>
                  <SelectItem value="cardano">Cardano (ADA)</SelectItem>
                  <SelectItem value="solana">Solana (SOL)</SelectItem>
                  <SelectItem value="ripple">Ripple (XRP)</SelectItem>
                  <SelectItem value="polkadot">Polkadot (DOT)</SelectItem>
                  <SelectItem value="dogecoin">Dogecoin (DOGE)</SelectItem>
                  <SelectItem value="bank">Banküberweisung</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Wallet-Adresse / Kontodetails</Label>
              <Input
                id="address"
                placeholder="Ihre Wallet-Adresse oder Kontonummer eingeben"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {result && (
              <Alert variant={result.success ? "default" : "destructive"}>
                {result.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertDescription className="text-sm font-medium">{result.message}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wird verarbeitet...
                </>
              ) : (
                "Auszahlung anfordern"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
