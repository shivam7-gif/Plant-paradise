'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {useRouter} from "next/navigation";
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  Calendar, 
  Droplets, 
  Sun, 
  Heart, 
  Edit, 
  Trash2,
  Image as ImageIcon,
  Leaf,
  TrendingUp,
  Clock,
  Camera,
  Filter,
  Grid3x3,
  List,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';


const mockPlants = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    nickname: 'Monty',
    species: 'Monstera deliciosa',
    dateAdded: '2024-01-15',
    lastWatered: '2024-02-01',
    health: 'Excellent',
    location: 'Living Room',
    image: '/public/plant-photo-3.jpg',
    notes: 'Growing beautifully! New leaf unfurling.',
    tags: ['Indoor', 'Tropical', 'Low Light'],
  },
  {
    id: 2,
    name: 'Snake Plant',
    nickname: 'Sneky',
    species: 'Sansevieria trifasciata',
    dateAdded: '2024-01-20',
    lastWatered: '2024-01-28',
    health: 'Good',
    location: 'Bedroom',
    image: '/api/placeholder/400/300',
    notes: 'Very low maintenance, perfect for beginners.',
    tags: ['Indoor', 'Succulent', 'Air Purifier'],
  },
  {
    id: 3,
    name: 'Fiddle Leaf Fig',
    nickname: 'Figgy',
    species: 'Ficus lyrata',
    dateAdded: '2024-02-01',
    lastWatered: '2024-02-04',
    health: 'Fair',
    location: 'Office',
    image: '/api/placeholder/400/300',
    notes: 'Need to watch for brown spots on leaves.',
    tags: ['Indoor', 'Statement Plant'],
  },
];
export default function JournalPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredPlants = mockPlants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.species.toLowerCase().includes(searchQuery.toLowerCase())
  );
   const router = useRouter();
  function navigatToScan(){
  router.push("/identify");
}
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'Excellent':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Good':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Fair':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Poor':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Plant Journal" />
      
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-7xl space-y-8">

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 p-8 md:p-12 shadow-2xl">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <Leaf className="h-4 w-4 text-emerald-200" />
                <span className="text-sm font-semibold text-white">Your Green Collection</span>
              </div>
              
              <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}>
                Plant Journal
              </h1>
              <p className="mb-6 max-w-2xl text-lg text-emerald-50">
                Track, nurture, and watch your plant family thrive. Every leaf tells a story.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => setShowAddDialog(true)}
                  size="lg" 
                  className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add New Plant
                </Button>
                <Button 
                onClick ={navigatToScan} 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Quick Scan
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50 hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-sm font-medium text-emerald-600">Total Plants</CardDescription>
                <CardTitle className="text-3xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {mockPlants.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+2 this month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-sm font-medium text-blue-600">Watered Today</CardDescription>
                <CardTitle className="text-3xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  2
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Droplets className="h-4 w-4" />
                  <span>3 more pending</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-amber-50 hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-sm font-medium text-amber-600">Health Score</CardDescription>
                <CardTitle className="text-3xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  92%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <Heart className="h-4 w-4" />
                  <span>Excellent care!</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-sm font-medium text-purple-600">Growth Streak</CardDescription>
                <CardTitle className="text-3xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  28
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-purple-600">
                  <Sparkles className="h-4 w-4" />
                  <span>days in a row</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search your plants..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  
                  <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plants Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPlants.map((plant) => (
                <Card key={plant.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  {/* Plant Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-100 to-green-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="h-16 w-16 text-emerald-300" />
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge className={`${getHealthColor(plant.health)} border shadow-sm`}>
                        {plant.health}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          {plant.name}
                        </CardTitle>
                        <CardDescription className="text-sm italic text-emerald-600 mt-1">
                          "{plant.nickname}" • {plant.species}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {plant.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-emerald-200 text-emerald-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-emerald-600" />
                        <div>
                          <p className="text-xs text-gray-500">Added</p>
                          <p className="font-medium">{new Date(plant.dateAdded).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Droplets className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Watered</p>
                          <p className="font-medium">{new Date(plant.lastWatered).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{plant.notes}</p>
                  </CardContent>

                  <CardFooter className="gap-2 border-t border-gray-100 bg-gray-50/50 p-4">
                    <Button variant="outline" size="sm" className="flex-1 hover:bg-emerald-50 hover:border-emerald-300">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 hover:bg-blue-50 hover:border-blue-300">
                      <Droplets className="mr-2 h-4 w-4" />
                      Water
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPlants.map((plant) => (
                <Card key={plant.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-emerald-400" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                              {plant.name}
                            </h3>
                            <p className="text-sm text-emerald-600 italic">"{plant.nickname}" • {plant.species}</p>
                          </div>
                          <Badge className={`${getHealthColor(plant.health)} border`}>
                            {plant.health}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-emerald-600" />
                            <span>Added {new Date(plant.dateAdded).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Droplets className="h-4 w-4 text-blue-600" />
                            <span>Last watered {new Date(plant.lastWatered).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Sun className="h-4 w-4 text-amber-600" />
                            <span>{plant.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {plant.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs border-emerald-200 text-emerald-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="hover:bg-emerald-50">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-blue-50">
                              <Droplets className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredPlants.length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="mb-4 rounded-full bg-emerald-100 p-6">
                  <Leaf className="h-12 w-12 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  No plants found
                </h3>
                <p className="mb-6 text-gray-600 text-center max-w-md">
                  {searchQuery ? "Try adjusting your search" : "Start your plant journey by adding your first plant!"}
                </p>
                {!searchQuery && (
                  <Button onClick={() => setShowAddDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Plant
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}