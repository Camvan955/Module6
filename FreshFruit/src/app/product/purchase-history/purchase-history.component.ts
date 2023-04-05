import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {OrderService} from "../../service/order/order.service";
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {PurchaseHistoryDto} from "../../dto/purchase-history-dto";
import {HistoryJson} from "../../dto/history-json";

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  idAccount = 0;
  page = 0;
  purchaseHistoryList: PurchaseHistoryDto[] = [];
  purchaseHistoryJson!: HistoryJson;

  constructor(private title: Title,
              private tokenStorageService: TokenStorageService,
              private orderService: OrderService) {
    this.title.setTitle("Lịch sử mua hàng")
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getPurcharseHistory();
  }

  getPurcharseHistory(): void {
    this.idAccount = parseInt(this.tokenStorageService.getIdAccount());
    this.orderService.getPurchaseHistory(this.idAccount, this.page).subscribe(data => {
      this.purchaseHistoryList = data.content;
      console.log(this.purchaseHistoryList);
      this.purchaseHistoryJson = data;
    })
  }

  gotoPage(pageNumber: number): void {
    this.page = pageNumber;
    this.ngOnInit();
  }
}
