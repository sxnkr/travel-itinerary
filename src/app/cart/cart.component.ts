import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItineraryService } from '../services/itinerary.service';
import { Itinerary } from '../models/itinerary.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Cart & Summary</h1>
      
      <div *ngIf="cartItems.length === 0" class="empty-cart">
        <p>Your cart is empty</p>
      </div>

      <div *ngIf="cartItems.length > 0">
        <div *ngFor="let item of cartItems" class="cart-item">
          <h3>{{item.country}} - {{item.place}}</h3>
          <p><strong>Food:</strong> {{item.foodPreference}}</p>
          <p><strong>Activities:</strong> {{item.activities.join(', ')}}</p>
          <p><strong>Hotel:</strong> {{item.hotel.type}} ({{item.hotel.nights}} nights)</p>
          <p><strong>Flight Charges:</strong> ₹{{item.flightCharges}}</p>
          <p><strong>Package Cost:</strong> ₹{{item.totalCost}}</p>
          <button (click)="removeFromCart(item.id)" class="btn-remove">Remove</button>
        </div>
        
        <div class="total-section">
          <h2>Total Amount: ₹{{totalCost}}</h2>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 800px; margin: 0 auto; }
    .cart-item { border: 1px solid #ddd; padding: 20px; margin: 10px 0; border-radius: 8px; }
    .btn-remove { background: #dc3545; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-remove:hover { background: #c82333; }
    .total-section { margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px; text-align: center; }
    .empty-cart { text-align: center; margin-top: 50px; }
  `]
})
export class CartComponent implements OnInit {
  cartItems: Itinerary[] = [];
  totalCost: number = 0;

  constructor(private itineraryService: ItineraryService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.itineraryService.getCart();
    this.totalCost = this.itineraryService.getTotalCost();
  }

  removeFromCart(id: string): void {
    this.itineraryService.removeFromCart(id);
    this.loadCart();
  }
}
