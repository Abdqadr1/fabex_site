<div class="modal fade" tabindex="-1" data-bank-modal data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="border-radius: 12px;">
            <div class="modal-header px-3">
                <h5 class="modal-title">Enter your bank details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-3 px-4 rounded">

                <form action="php/add_bank.php" method="POST" id="addBankForm">
                    <div tabindex="-1" class="alert alert-dismissible alert-danger d-none text-center" id="errorDiv" role="alert"></div>
                    <div class="mt-1 my-4">
                        <label for="bankname" class="form-label settings">Bank name</label>
                        <select name="bank_name" class="form-select rad8" id="bankname" required>
                            <option hidden disabled selected>Select bank</option>
                        </select>
                    </div>
                    <div class="mt-1 my-4">
                        <label for="accountnumber" class="form-label settings">Account number</label>
                        <input name="account_number" type="text" class="form-control rad8" id="accountnumber" placeholder="Enter account number" maxlength="10" minlength="10" required>
                    </div>
                    <div class="mt-1 mt-3 mb-1">
                        <label for="nin" class="form-label settings">National Identity Number</label>
                        <input name="nin" type="text" class="form-control rad8" id="nin" placeholder="Enter your nin" maxlength="11" minlength="11" required>
                    </div>
                    <div class="row justify-content-center no-margin mt-4 mb-2">
                        <button type="submit" class="col-12 settings text-center mx-auto">Add account details</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>