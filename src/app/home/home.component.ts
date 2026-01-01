import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItineraryService } from '../services/itinerary.service';
import { Itinerary } from '../models/itinerary.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Travel Itinerary</h1>
      
      <div class="dropdown-container">
        <label for="destination">Select Destination:</label>
        <select id="destination" [(ngModel)]="selectedDestination" (change)="onDestinationChange()">
          <option value="">Choose a destination</option>
          <option *ngFor="let destination of destinations" [value]="destination">
            {{destination}}
          </option>
        </select>
      </div>

      <div class="compare-section" *ngIf="compareList.length > 0">
        <h3>Compare Packages ({{compareList.length}}/3)</h3>
        <div class="compare-items">
          <div *ngFor="let item of compareList" class="compare-item">
            {{item.place}} - ₹{{item.totalCost}}
            <button (click)="removeFromCompare(item.id)" class="btn-small">×</button>
          </div>
        </div>
        <button (click)="clearCompare()" class="btn-clear">Clear All</button>
      </div>

      <div class="itineraries" *ngIf="selectedDestination">
        <div *ngFor="let itinerary of filteredItineraries" class="card" 
             [class.selected]="isInCompare(itinerary.id)">
          <h3>{{itinerary.country}} - {{itinerary.place}}</h3>
          <p><strong>Food:</strong> {{itinerary.foodPreference}}</p>
          <p><strong>Activities:</strong> {{itinerary.activities.join(', ')}}</p>
          <p><strong>Hotel:</strong> {{itinerary.hotel.type}} ({{itinerary.hotel.nights}} nights)</p>
          <p><strong>Flight Charges:</strong> ₹{{itinerary.flightCharges}}</p>
          <p><strong>Total Cost:</strong> ₹{{itinerary.totalCost}}</p>
          <div class="card-actions">
            <button (click)="addToCompare(itinerary)" 
                    [disabled]="compareList.length >= 3 && !isInCompare(itinerary.id)"
                    class="btn-compare">
              {{isInCompare(itinerary.id) ? 'Remove Compare' : 'Compare'}}
            </button>
            <button (click)="addToCart(itinerary)" class="btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    .dropdown-container { margin: 20px 0; }
    select { padding: 8px; margin-left: 10px; }
    .compare-section { background: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 8px; }
    .compare-items { display: flex; gap: 10px; margin: 10px 0; }
    .compare-item { background: white; padding: 8px 12px; border-radius: 4px; display: flex; align-items: center; gap: 8px; }
    .btn-small { background: #dc3545; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; }
    .btn-clear { background: #6c757d; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; }
    .itineraries { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px; }
    .card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
    .card.selected { border-color: #007bff; background: #f0f8ff; }
    .card-actions { display: flex; gap: 10px; margin-top: 10px; }
    .btn { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    .btn:hover { background: #0056b3; }
    .btn-compare { background: #28a745; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-compare:hover { background: #218838; }
    .btn-compare:disabled { background: #6c757d; cursor: not-allowed; }
  `]
})
export class HomeComponent implements OnInit {
  destinations: string[] = [];
  selectedDestination: string = '';
  filteredItineraries: Itinerary[] = [];
  compareList: Itinerary[] = [];

  constructor(private itineraryService: ItineraryService) {}

  ngOnInit(): void {
    this.destinations = this.itineraryService.getDestinations();
    this.loadCompareList();
  }

  onDestinationChange(): void {
    this.filteredItineraries = this.itineraryService.getItinerariesByDestination(this.selectedDestination);
  }

  addToCart(itinerary: Itinerary): void {
    this.itineraryService.addToCart(itinerary);
    alert('Added to cart!');
  }

  addToCompare(itinerary: Itinerary): void {
    if (this.isInCompare(itinerary.id)) {
      this.removeFromCompare(itinerary.id);
    } else if (this.compareList.length < 3) {
      this.compareList.push(itinerary);
      this.saveCompareList();
    }
  }

  removeFromCompare(id: string): void {
    this.compareList = this.compareList.filter(item => item.id !== id);
    this.saveCompareList();
  }

  clearCompare(): void {
    this.compareList = [];
    this.saveCompareList();
  }

  isInCompare(id: string): boolean {
    return this.compareList.some(item => item.id === id);
  }

  private loadCompareList(): void {
    const saved = localStorage.getItem('compareList');
    this.compareList = saved ? JSON.parse(saved) : [];
  }

  private saveCompareList(): void {
    localStorage.setItem('compareList', JSON.stringify(this.compareList));
  }
}
