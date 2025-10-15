"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, DollarSign, PieChart } from "lucide-react"
import Link from "next/link"
import { userService } from "@/lib/user-service"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [investments, setInvestments] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, investmentsData, transactionsData] = await Promise.all([
          userService.getCurrentUser(),
          userService.getUserInvestments(),
          userService.getUserTransactions(),
        ])
        setUser(userData)
        setInvestments(investmentsData)
        setTransactions(transactionsData)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Willkommen zurück! Hier ist Ihre Investitionsübersicht.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtguthaben</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(user?.balance || 0)}</div>
            <p className="text-xs text-muted-foreground">+20.1% vom letzten Monat</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtinvestiert</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(user?.totalInvested || 0)}</div>
            <p className="text-xs text-muted-foreground">15 aktive Investitionen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtgewinn</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(user?.totalEarnings || 0)}</div>
            <p className="text-xs text-muted-foreground">+15.3% Rendite</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio-Wert</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(user?.balance || 0)}</div>
            <p className="text-xs text-muted-foreground">Diversifiziert über 5 Assets</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Aktive Investitionen</CardTitle>
            <CardDescription>Ihre aktuellen Investitionen und deren Leistung</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investments.slice(0, 5).map((investment) => (
                <div key={investment.id} className="flex items-center">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{investment.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(investment.amount)} • {investment.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-green-600">+{investment.returnRate}%</span>
                    <span className="text-sm font-bold">{formatCurrency(investment.currentValue)}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/investments">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Alle Investitionen anzeigen
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Letzte Transaktionen</CardTitle>
            <CardDescription>Ihre neuesten Kontoaktivitäten</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString("de-DE")}
                    </p>
                  </div>
                  <div
                    className={`text-sm font-medium ${transaction.type === "deposit" || transaction.type === "earnings" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.type === "deposit" || transaction.type === "earnings" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/history">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Gesamten Verlauf anzeigen
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Schnellaktionen</CardTitle>
            <CardDescription>Verwalten Sie Ihre Investitionen</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link href="/dashboard/deposit">
              <Button className="w-full" variant="default">
                <ArrowDownRight className="mr-2 h-4 w-4" />
                Einzahlen
              </Button>
            </Link>
            <Link href="/dashboard/withdraw">
              <Button className="w-full bg-transparent" variant="outline">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Abheben
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kontoübersicht</CardTitle>
            <CardDescription>Ihr Verifizierungsstatus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Konto verifiziert</span>
                <span className="text-sm text-green-600">✓ Aktiv</span>
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Ihr Konto ist vollständig verifiziert und bereit für Transaktionen.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
