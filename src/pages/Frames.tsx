
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

const FRAMES = [
  { 
    id: 1, 
    name: 'Ray-Ban Classic', 
    brand: 'Ray-Ban', 
    material: 'Metal', 
    shape: 'Square',
    color: 'Black',
    price: 129.99,
    stock: 45,
    image: 'https://placehold.co/300x200/e0f1fe/0e9be9?text=Ray-Ban+Classic'
  },
  { 
    id: 2, 
    name: 'Oakley Sport', 
    brand: 'Oakley', 
    material: 'Plastic', 
    shape: 'Rectangle',
    color: 'Blue',
    price: 149.99,
    stock: 32,
    image: 'https://placehold.co/300x200/e0f1fe/0e9be9?text=Oakley+Sport'
  },
  { 
    id: 3, 
    name: 'Gucci Elegance', 
    brand: 'Gucci', 
    material: 'Metal', 
    shape: 'Round',
    color: 'Gold',
    price: 329.99,
    stock: 18,
    image: 'https://placehold.co/300x200/e0f1fe/0e9be9?text=Gucci+Elegance'
  },
  { 
    id: 4, 
    name: 'Prada Luxury', 
    brand: 'Prada', 
    material: 'Acetate', 
    shape: 'Cat Eye',
    color: 'Tortoise',
    price: 299.99,
    stock: 22,
    image: 'https://placehold.co/300x200/e0f1fe/0e9be9?text=Prada+Luxury'
  },
  { 
    id: 5, 
    name: 'Tom Ford Designer', 
    brand: 'Tom Ford', 
    material: 'Titanium', 
    shape: 'Aviator',
    color: 'Silver',
    price: 399.99,
    stock: 12,
    image: 'https://placehold.co/300x200/e0f1fe/0e9be9?text=Tom+Ford+Designer'
  },
  { 
    id: 6, 
    name: 'Persol Vintage', 
    brand: 'Persol', 
    material: 'Acetate', 
    shape: 'Round',
    color: 'Havana',
    price: 259.99,
    stock: 15,
    image: 'https://placehold.co/300x200/e0f1fe/0e9be9?text=Persol+Vintage'
  }
];

const Frames = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');

  const filteredFrames = FRAMES.filter(frame => {
    const matchSearch = frame.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       frame.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchBrand = filterBrand === 'all' ? true : frame.brand === filterBrand;
    
    return matchSearch && matchBrand;
  });

  const uniqueBrands = Array.from(new Set(FRAMES.map(frame => frame.brand)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Frames</h1>
          <p className="text-muted-foreground">Manage your eyeglass frames inventory</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Frame
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search frames..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterBrand} onValueChange={setFilterBrand}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {uniqueBrands.map(brand => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFrames.map((frame) => (
          <Card key={frame.id} className="overflow-hidden">
            <div className="aspect-[3/2] relative">
              <img 
                src={frame.image} 
                alt={frame.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={frame.stock > 20 ? 'secondary' : frame.stock > 10 ? 'outline' : 'destructive'}>
                  {frame.stock > 20 ? 'In Stock' : frame.stock > 10 ? 'Low Stock' : 'Very Low Stock'}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{frame.name}</h3>
                    <p className="text-sm text-muted-foreground">{frame.brand}</p>
                  </div>
                  <p className="font-bold">${frame.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary">{frame.material}</Badge>
                  <Badge variant="secondary">{frame.shape}</Badge>
                  <Badge variant="secondary">{frame.color}</Badge>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground">{frame.stock} in stock</span>
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

export default Frames;
