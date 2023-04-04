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

  purchaseHistory: PurchaseHistoryDto[] = [];
  purchaseList!: HistoryJson;
  request = {page: 0, size: 5};
  pageNumber = 0;
  totalPages = 0;
  idAccount: string = '';

  constructor(private title: Title,
              private orderService: OrderService,
              private tokenStorageService: TokenStorageService) {
    this.title.setTitle("Lịch sử mua hàng")
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getPurchaseHistory(0);
  }

  getPurchaseHistory(page: number): void {
    this.idAccount = this.tokenStorageService.getIdAccount();
    this.orderService.getPurchaseHistory(parseInt(this.idAccount),page).subscribe(data => {
        this.purchaseList = data;
        this.purchaseHistory = data.content;
      this.totalPages = data.totalPages;
        this.pageNumber = data.pageable.pageNumber;
      }
    )
  }

  changePage(pageNumber: number): void {
    this.request.page = pageNumber;
    this.ngOnInit();
  }

}
