
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search } from 'lucide-react';

const LENSES = [
  {
    id: 1,
    name: 'Single Vision Standard',
    type: 'Single Vision',
    material: 'CR-39',
    coating: 'Anti-scratch',
    index: '1.50',
    price: 79.99,
    stock: 120,
    image: 'https://placehold.co/300x200/e0f1fe/0e9be9?text=Single+Vision'
  },
  {
    id: 2,
    name: 'Single Vision Premium',
    type: 'Single Vision',
    material: 'Polycarbonate',
    coating: 'Anti-reflective',
    index: '1.59',
    price: 129.99,
    stock: 85,
    image: 'https://placehold.co/300x200/e0f1fe/0e9be9?text=SV+Premium'
  },
  {
    id: 3,
    name: 'Progressive Standard',
    type: 'Progressive',
    material: 'CR-39',
    coating: 'Anti-scratch',
    index: '1.50',
    price: 199.99,
    stock: 65,
    image: 'https://placehold.co/300x200/e0f1fe/0e9be9?text=Progressive'
  },
  {
    id: 4,
    name: 'Progressive Premium',
    type: 'Progressive',
    material: 'High-index',
    coating: 'Anti-reflective, Blue light filter',
    index: '1.67',
    price: 299.99,
    stock: 42,
    image: 'https://placehold.co/300x200/e0f1fe/0e9be9?text=Prog+Premium'
  },
  {
    id: 5,
    name: 'Bifocal Standard',
    type: 'Bifocal',
    material: 'CR-39',
    coating: 'Anti-scratch',
    index: '1.50',
    price: 149.99,
    stock: 38,
    image: 'https://placehold.co/300x200/e0f1fe/0e9be9?text=Bifocal'
  },
  {
    id: 6,
    name: 'Transitions Elite',
    type: 'Photochromic',
    material: 'High-index',
    coating: 'Anti-reflective, UV protection',
    index: '1.67',
    price: 249.99,
    stock: 30,
    image: 'https://placehold.co/300x200/e0f1fe/0e9be9?text=Transitions'
  }
];

const Lenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredLenses = LENSES.filter(lens => {
    const matchSearch = lens.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       lens.material.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchType = filterType === 'all' ? true : lens.type === filterType;
    
    return matchSearch && matchType;
  });

  const uniqueTypes = Array.from(new Set(LENSES.map(lens => lens.type)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lenses</h1>
          <p className="text-muted-foreground">Manage your lens inventory</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Lens
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lenses..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {uniqueTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLenses.map((lens) => (
          <Card key={lens.id} className="overflow-hidden">
            <div className="aspect-[3/2] relative">
              <img 
                src={lens.image} 
                alt={lens.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={lens.stock > 50 ? 'secondary' : lens.stock > 20 ? 'outline' : 'destructive'}>
                  {lens.stock > 50 ? 'In Stock' : lens.stock > 20 ? 'Low Stock' : 'Very Low Stock'}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{lens.name}</h3>
                    <p className="text-sm text-muted-foreground">{lens.type}</p>
                  </div>
                  <p className="font-bold">${lens.price.toFixed(2)}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Material:</span> {lens.material}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Index:</span> {lens.index}
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Coating:</span> {lens.coating}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground">{lens.stock} in stock</span>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Lenses;
