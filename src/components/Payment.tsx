import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign, Calendar, CheckCircle, Activity, Server, Database, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUsageData } from "@/contexts/UsageDataContext";

const Payment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("25.00");
  const { toast } = useToast();
  const { usageData } = useUsageData();

  // Calculate usage costs from actual usage data
  const calculateUsageCosts = () => {
    const costs = {
      cpu: 0,
      memory: 0,
      storage: 0,
      network: 0,
      total: usageData.totalCost
    };

    // Extract individual costs from resource metrics
    usageData.resourceMetrics.forEach(metric => {
      const cost = parseFloat(metric.cost.replace('$', ''));
      switch (metric.name.toLowerCase()) {
        case 'cpu usage':
          costs.cpu = cost;
          break;
        case 'memory':
          costs.memory = cost;
          break;
        case 'storage':
          costs.storage = cost;
          break;
        case 'network':
          costs.network = cost;
          break;
      }
    });

    return costs;
  };

  const costs = calculateUsageCosts();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful!",
        description: `Payment of $${paymentAmount} has been processed successfully.`,
      });
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Payment</h1>
          <p className="text-muted-foreground">Pay-as-you-go billing dashboard</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Activity className="mr-2 h-4 w-4" />
            View Usage
          </Button>
          <Button className="w-full sm:w-auto">
            <CreditCard className="mr-2 h-4 w-4" />
            Add Funds
          </Button>
        </div>
      </div>

      {/* Current Usage & Costs */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {usageData.resourceMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                {metric.name === 'CPU Usage' && <Zap className="h-4 w-4 text-primary" />}
                {metric.name === 'Memory' && <Database className="h-4 w-4 text-primary" />}
                {metric.name === 'Storage' && <Server className="h-4 w-4 text-primary" />}
                {metric.name === 'Network' && <Activity className="h-4 w-4 text-primary" />}
                {metric.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-xl sm:text-2xl font-bold">{metric.value}{metric.unit}</div>
              <div className="text-xs text-muted-foreground">
                of {metric.max}{metric.unit}
              </div>
              <div className="text-sm font-medium text-primary">{metric.cost}/month</div>
              <div className={`text-xs flex items-center gap-1 ${
                metric.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'
              }`}>
                {metric.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Bill */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Current Bill
            </CardTitle>
            <CardDescription>Usage charges for this billing period</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {usageData.resourceMetrics.map((metric) => (
                <div key={metric.name} className="flex justify-between text-sm">
                  <span>{metric.name} ({metric.value}{metric.unit})</span>
                  <span>{metric.cost}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${usageData.totalCost.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Next bill: March 15, 2024</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Projected monthly cost: ${usageData.projectedCost.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Make Payment
            </CardTitle>
            <CardDescription>Add funds to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Payment Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="pl-9"
                  placeholder="25.00"
                  step="0.01"
                  min="1"
                />
              </div>
            </div>

            <div className="bg-muted/30 p-3 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Current balance: $15.50</span>
              </div>
              <div className="text-xs text-muted-foreground">
                New balance after payment: ${(15.50 + parseFloat(paymentAmount || "0")).toFixed(2)}
              </div>
            </div>

            <Button 
              onClick={handlePayment} 
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? "Processing..." : `Pay $${paymentAmount}`}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your recent payments and usage charges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "txn_001", date: "Mar 10, 2024", description: "Usage charges", amount: "-$3.47", type: "charge" },
              { id: "txn_002", date: "Mar 8, 2024", description: "Account credit", amount: "+$25.00", type: "payment" },
              { id: "txn_003", date: "Mar 5, 2024", description: "Usage charges", amount: "-$2.15", type: "charge" },
              { id: "txn_004", date: "Mar 1, 2024", description: "Account credit", amount: "+$50.00", type: "payment" },
            ].map((transaction, index) => (
              <div key={transaction.id}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="font-medium text-sm">{transaction.id}</span>
                    <span className="text-sm text-muted-foreground">{transaction.date}</span>
                    <span className="text-sm">{transaction.description}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-medium ${
                      transaction.type === 'payment' ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {transaction.amount}
                    </span>
                    <Badge variant={transaction.type === 'payment' ? 'secondary' : 'outline'}>
                      {transaction.type === 'payment' ? 'Credit' : 'Usage'}
                    </Badge>
                  </div>
                </div>
                {index < 3 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-6">
            View All Transactions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payment;