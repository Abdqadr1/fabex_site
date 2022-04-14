<!-- header -->
<h3 class="text-left mb-3">Rate management</h3>
<div class='d-flex align-items-center justify-content-center' style='height: 50%;' id="loading">
    <div class='spinner-border text-primary' role='status' style='height: 60px; width:60px;'>
        <span class='visually-hidden'>Loading...</span>
    </div>
</div>
<!-- rates -->
<div class="admin-rate row justify-content-between py-1 d-none" id="admin_rate">
    <div class="col-6 px-4 py-0 rate-column" id="buyDiv">
        <div class="sticky-top bg-white">
            <h4 class="text-primary py-2 border-bottom border-secondary rounded border-1 me-4">Buy</h4>
        </div>
        <!-- each rate -->
        <!-- <div class="row justify-content-between mt-3 px-4">
            <div class="col-8 text-muted text-left">
                <span class="d-inline-block product-name">Crypto</span>
            </div>
            <div class="col-2">
                <input type="number" class="form-control admin-rate text-center">
            </div>
        </div> -->
    </div>
    <div class="col-6 px-4 py-0 rate-column" id="sellDiv">
        <div class="sticky-top bg-white">
            <h4 class="text-primary py-2 border-bottom border-secondary rounded border-1 me-4">Sell</h4>
        </div>
        <!-- each rate -->
        <!-- <div class="row justify-content-between mt-3 px-4">
            <div class="col-7 text-muted text-left">
                <span class="d-inline-block product-name">Crypto</span>
            </div>
            <div class="col-2">
                <input type="number" class="form-control admin-rate text-center">
            </div>
            <div class='spinner-border spinner-border-sm mt-2 text-primary d-none' aria-hidden='true' role='status' id="loader"></div>
            <span class="material-icons text-primary mt-2 d-none" style="width: 24px;" id="icon">done</span>
        </div> -->

    </div>
</div>
<!-- apply button  -->
<div class="d-flex justify-content-end pe-3">
    <btn class="btn btn-primary px-5 mt-4" id="applyBtn">Apply</b>
</div>
<!-- Modal -->
<div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content p-3">
            <div class="modal-header py-1">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-1" id="modal_body">
                ...
            </div>
        </div>
    </div>
</div>