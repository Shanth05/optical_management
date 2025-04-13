
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Download } from 'lucide-react';

const ORDERS = [
  {
    id: '10012',
    customer: 'John Smith',
    date: '2023-04-10',
    items: 'Ray-Ban Classic, Single Vision Premium',
    total: 209.98,
    status: 'Completed',
    payment: 'Paid'
  },
  {
    id: '10011',
    customer: 'Emily Johnson',
    date: '2023-04-09',
    items: 'Gucci Elegance, Progressive Premium',
    total: 629.98,
    status: 'Processing',
    payment: 'Paid'
  },
  {
    id: '10010',
    customer: 'Michael Brown',
    date: '2023-04-08',
    items: 'Tom Ford Designer, Transitions Elite',
    total: 649.98,
    status: 'Shipped',
    payment: 'Paid'
  },
  {
    id: '10009',
    customer: 'Sarah Wilson',
    date: '2023-04-07',
    items: 'Prada Luxury, Bifocal Standard',
    total: 449.98,
    status: 'Completed',
    payment: 'Paid'
  },
  {
    id: '10008',
    customer: 'David Miller',
    date: '2023-04-06',
    items: 'Oakley Sport, Single Vision Standard',
    total: 229.98,
    status: 'Processing',
    payment: 'Pending'
  },
  {
    id: '10007',
    customer: 'Jessica Taylor',
    date: '2023-04-05',
    items: 'Persol Vintage, Progressive Standard',
    total: 459.98,
    status: 'Cancelled',
    payment: 'Refunded'
  }
];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = ORDERS.filter(order => {
    const matchSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.id.includes(searchTerm);
    
    const matchStatus = filterStatus === 'all' ? true : order.status === filterStatus;
    
    return matchSearch && matchStatus;
  });

  const uniqueStatuses = Array.from(new Set(ORDERS.map(order => order.status)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Refunded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer or order #..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {uniqueStatuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={order.items}>
                      {order.items}
                    </div>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(order.payment)}`}>
                      {order.payment}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
