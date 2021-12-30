<!-- headers -->
<div class="d-flex flex-column flex-md-row justify-content-between">
    <h2>Orders</h2>
    <select class="form-select rad8" id="which" style="width: 200px;">
        <option value="crypto" selected>Crypto</option>
        <option value="giftcard">Giftcard</option>
    </select>
</div>
<!-- buy and sell buttons -->
<div class="d-flex justify-content-center mt-3" id="action_buttons">
    <button class="btn btn-outline-secondary mr-3 buy active trading" type="buy">Buy Orders</button>
    <button class="btn btn-outline-secondary ml-3 buy trading" type="sell">Sell Orders</button>
</div>
<!-- tabs -->
<nav class="navbar navbar-expand-md py-0 text-black">
    <div class="d-flex justify-content-start px-3 px-md-5">
        <ul class="navbar-nav mx-auto">
            <li class="nav-item">
                <a class="nav-link d-none d-md-block active border-bottom border-2 border-primary py-md-3 py-1 nav-tab" style="cursor: pointer;color:#131313;">
                    Pending</a>
            </li>
            <li class="nav-item">
                <a class="nav-link py-md-3 py-1 nav-tab" style="cursor: pointer;color:#131313;">Approved</a>
            </li>
            <li class="nav-item">
                <a class="nav-link py-md-3 py-1 nav-tab" style="cursor: pointer;color:#131313;">Rejected</a>
            </li>
        </ul>
    </div>
</nav>
<!-- order table -->
<div class='d-flex justify-content-center mt-3' id="orders_loading">
    <div class='spinner-border text-primary' role='status' style='height: 40px; width:40px;'>
        <span class='visually-hidden'>Loading...</span>
    </div>
</div>
<table class="table table-borderless table-hover d-none" id="table">
    <thead class="d-none" style="background-color: var(--todo-bg);" id="crypto_header">
        <tr style="color: var(--header);">
            <th scope="col">Transaction ID</th>
            <th scope="col">Name of User</th>
            <th scope="col">Coin type</th>
            <th scope="col">Amount</th>
            <th scope="col">Address</th>
            <th scope="col">Memo</th>
            <th scope="col">Time stamp</th>
            <th scope="col">Action</th>
        </tr>
    </thead>
    <thead class="d-none" style="background-color: var(--todo-bg);" id="giftcard_header">
        <tr style="color: var(--header);">
            <th scope="col">Transaction ID</th>
            <th scope="col">Name of User</th>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Email address</th>
            <th scope="col">Time stamp</th>
            <th scope="col">Action</th>
        </tr>
    </thead>
    <tbody class="td">
        <!-- <tr>
            <td>1234567890</td>
            <td>Oyeleye Joseph</td>
            <td>BTC</td>
            <td>$29.1<br><span class='extra-detail'>N14,899.2</span></td>
            <td>
                <span class="val">0x5dCF1A8934234565...<span class="copy material-icons" title="copy address">content_copy</span></span>
                <br><span class="extra-detail">ERC 20</span>
            </td>
            <td>
                <span class="val">1134<span class="copy material-icons" title="copy memo">content_copy</span></span>
            </td>
            <td>Today, 12:53 pm</td>
            <td class="d-flex justify-content-center align-top">
                <button class="action-button approve">Approve</button>
                <button class="action-button reject">Reject</button>
            </td>
        </tr>
        <tr>
            <td>1234567890</td>
            <td>Oyeleye Joseph</td>
            <td>BTC</td>
            <td>$29.1<br><span class='extra-detail'>N14,899.2</span></td>
            <td>
                <span class="val">0x5dCF1A8934234565...<span class="copy material-icons" title="copy address">content_copy</span></span>
                <br><span class="extra-detail">ERC 20</span>
            </td>
            <td>
                <span class="val">1134<span class="copy material-icons" title="copy memo">content_copy</span></span>
            </td>
            <td>Today, 12:53 pm</td>
            <td class="d-flex justify-content-center align-top">
                <button class="action-button approve">Approve</button>
                <button class="action-button reject">Reject</button>
            </td>
        </tr> -->
        <!-- <tr>
            <td>1234567890</td>
            <td>Oyeleye Joseph</td>
            <td>Amazon Gift card</td>
            <td>$29.1<br><span class='extra-detail'>N14,899.2</span></td>
            <td>
                <span class="val">josephy123@gmail.com<span class="copy material-icons" title="copy address">content_copy</span></span>
            </td>
            <td>Today, 12:53 pm</td>
            <td class="d-flex justify-content-center align-top">
                <button class="action-button approve">Approve</button>
                <button class="action-button reject">Reject</button>
            </td>
        </tr> -->
    </tbody>
</table>
<!-- Modal -->
<div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content p-3">
            <div class="modal-header py-1">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-1 text-success" id="modal_body">
                ...
            </div>
        </div>
    </div>
</div>