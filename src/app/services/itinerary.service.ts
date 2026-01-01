import { Injectable } from '@angular/core';
import { Itinerary } from '../models/itinerary.model';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private itineraries: Itinerary[] = [
    {
      id: '1',
      country: 'India',
      place: 'Goa',
      foodPreference: 'Both',
      activities: ['Beach Sports', 'Water Skiing'],
      hotel: { type: '5-Star Resort', nights: 3 },
      flightCharges: 15000,
      totalCost: 45000
    },
    {
      id: '2',
      country: 'India',
      place: 'Kerala',
      foodPreference: 'Veg',
      activities: ['Backwater Cruise', 'Ayurveda Spa'],
      hotel: { type: 'Houseboat', nights: 2 },
      flightCharges: 12000,
      totalCost: 35000
    },
    {
      id: '3',
      country: 'Thailand',
      place: 'Bangkok',
      foodPreference: 'Non-Veg',
      activities: ['Temple Tours', 'Street Food'],
      hotel: { type: '4-Star Hotel', nights: 4 },
      flightCharges: 25000,
      totalCost: 55000
    },
    {
      id: '4',
      country: 'Thailand',
      place: 'Phuket',
      foodPreference: 'Both',
      activities: ['Island Hopping', 'Scuba Diving'],
      hotel: { type: 'Beach Resort', nights: 5 },
      flightCharges: 28000,
      totalCost: 65000
    }
  ];

  getDestinations(): string[] {
    return [...new Set(this.itineraries.map(i => i.country))];
  }

  getItinerariesByDestination(destination: string): Itinerary[] {
    return this.itineraries.filter(i => i.country === destination);
  }

  addToCart(itinerary: Itinerary): void {
    const cart = this.getCart();
    cart.push(itinerary);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): Itinerary[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  removeFromCart(id: string): void {
    const cart = this.getCart().filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getTotalCost(): number {
    return this.getCart().reduce((total, item) => total + item.totalCost, 0);
  }
}
