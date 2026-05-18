'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EMERGENCY_SERVICES } from '@/lib/constants';
import { MapPin, Phone, Navigation, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EmergencyPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, []);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  const servicesWithDistance = EMERGENCY_SERVICES.map(service => {
    if (userLocation) {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        service.coordinates.lat,
        service.coordinates.lng
      );
      return { ...service, distance };
    }
    return { ...service, distance: null };
  }).sort((a, b) => {
    if (a.distance === null) return 1;
    if (b.distance === null) return -1;
    return a.distance - b.distance;
  });

  const openDirections = (service: typeof EMERGENCY_SERVICES[0]) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${service.coordinates.lat},${service.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const callEmergency = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-red-900 mb-2">Emergency Services</h1>
            <p className="text-red-700">Find the nearest emergency medical services</p>
          </div>
        </div>

        {/* Emergency Alert */}
        <Card className="border-red-200 bg-red-50 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <div>
                <p className="font-semibold">For life-threatening emergencies, call 911 immediately</p>
                <p className="text-sm">This service helps you find nearby medical facilities for urgent but non-life-threatening situations.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Status */}
        {locationError && (
          <Card className="border-yellow-200 bg-yellow-50 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-yellow-800">
                <MapPin className="h-5 w-5" />
                <p>{locationError}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Emergency Services List */}
        <div className="space-y-4">
          {servicesWithDistance.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-red-600" />
                      {service.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {service.address}
                    </CardDescription>
                  </div>
                  {service.distance && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {service.distance.toFixed(1)} km away
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => callEmergency(service.phone)}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call {service.phone}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => openDirections(service)}
                    className="flex-1"
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                </div>
                
                {/* Estimated arrival time */}
                {service.distance && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Estimated drive time: {Math.ceil(service.distance * 2)} minutes</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Tips */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Emergency Preparedness Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• Keep important medical information and emergency contacts easily accessible</li>
              <li>• Know the location of the nearest hospital or urgent care center</li>
              <li>• Have a basic first aid kit at home and in your car</li>
              <li>• Learn basic CPR and first aid techniques</li>
              <li>• Keep a list of current medications and allergies</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}