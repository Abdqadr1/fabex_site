<div class="row justify-content-start justify-content-lg-around mx-0 p-4">
    <!-- crypto column -->
    <div class="col-6 col-lg-4">
        <div class="no-margin pad">
            <h3>Crypto</h3>
            <div class="mx-0 mt-2" id="crypto-div">
                <!-- each crypto -->
                <div class="each-crypto">
                    <span class="d-inline-block crypto-name">Bitcoin (BTC)</span>
                    <span class="form-switch mx-3">
                        <input class="form-check-input" type="checkbox" role="switch">
                    </span>
                    <span class="material-icons text-primary three-dots">more_vert</span>
                </div>
                <!-- each crypto -->
                <div class="each-crypto">
                    <span class="d-inline-block crypto-name">Bitcoin (BTC)</span>
                    <span class="form-switch mx-3">
                        <input class="form-check-input" type="checkbox" role="switch">
                    </span>
                    <span class="material-icons text-primary three-dots">more_vert</span>
                </div>
                <!-- each crypto -->
                <div class="each-crypto">
                    <span class="d-inline-block crypto-name">Bitcoin (BTC)</span>
                    <span class="form-switch mx-3">
                        <input class="form-check-input" type="checkbox" role="switch">
                    </span>
                    <span class="material-icons text-primary three-dots">more_vert</span>
                </div>
            </div>
            <div class="add-crypto mt-2" title="add new crypto">
                <span class="material-icons add-crypto">add</span>
                <span>Add new crypto</span>
            </div>
            <form action="php/add_product" method="POST">
                <!-- coin name -->
                <div class="mt-3">
                    <label for="coin_name" class="form-label">Coin name</label>
                    <input id="coin_name" name="coin_name" type="text" class="form-control form-control-lg rad8" placeholder="Enter coin name" required>
                </div>
                <!-- coin name -->
                <div class="mt-3">
                    <label for="short_name" class="form-label">Acronym</label>
                    <input id="short_name" name="short_name" type="text" class="form-control form-control-lg rad8" placeholder="Short name" required>
                </div>
                <!-- network -->
                <div class="mt-3">
                    <label for="network" class="form-label">Network</label>
                    <select name="network" class="form-select rad8" id="network">
                        <option value="" selected disabled hidden>Select option</option>
                    </select>
                </div>
                <!-- coin name -->
                <div class="mt-3">
                    <label for="address" class="form-label">Address</label>
                    <input id="address" name="address" type="text" class="form-control form-control-lg rad8" placeholder="Enter wallet address" required>
                </div>
                <!-- coin name -->
                <div class="mt-3">
                    <label for="memo" class="form-label">Memo</label>
                    <input id="memo" name="memo" type="text" class="form-control form-control-lg rad8" placeholder="Memo" required>
                </div>
                <button class="payment" type="submit">Add New Crypto</button>
            </form>
        </div>
    </div>
    <!-- giftcard column -->
    <div class="col-6 col-lg-4">
        <div class="no-margin pad">
            <h3>Giftcards</h3>
            <div class="mx-0 mt-2" id="giftcard-div">
                <div class="each-giftcard">
                    <div class="inline-block">
                        <span class="d-inline-block crypto-name">Amazon Giftcards</span>
                        <span class="form-switch mx-3">
                            <input class="form-check-input" type="checkbox" role="switch">
                        </span>
                        <span class="material-icons text-primary three-dots">more_vert</span>
                    </div>
                    <span class="sub_cat">Sub-category</span>
                    <div class="inline-block">
                        <span class="d-inline-block crypto-name">Amazon Giftcards (100-200)</span>
                        <span class="form-switch mx-3">
                            <input class="form-check-input" type="checkbox" role="switch" checked>
                        </span>
                        <span class="material-icons text-primary three-dots">more_vert</span>
                    </div>
                    <div class="inline-block">
                        <span class="d-inline-block crypto-name">Amazon Giftcards (100-200)</span>
                        <span class="form-switch mx-3">
                            <input class="form-check-input" type="checkbox" role="switch" checked>
                        </span>
                        <span class="material-icons text-primary three-dots">more_vert</span>
                    </div>
                    <div class="add-giftcard mt-2" title="add new sub category">
                        <span class="material-icons add-crypto">add</span>
                        <span>Add Subcategory</span>
                    </div>
                </div>
            </div>
            <div class="mx-0 mt-2" id="giftcard-div">
                <div class="each-giftcard">
                    <div class="inline-block">
                        <span class="d-inline-block crypto-name">Amazon Giftcards</span>
                        <span class="form-switch mx-3">
                            <input class="form-check-input" type="checkbox" role="switch">
                        </span>
                        <span class="material-icons text-primary three-dots">more_vert</span>
                    </div>
                    <div class="add-giftcard mt-2" title="add new sub category">
                        <span class="material-icons add-crypto">add</span>
                        <span>Add Subcategory</span>
                    </div>
                </div>
            </div>
            <div class="mx-0 mt-2" id="giftcard-div">
                <div class="each-giftcard">
                    <div class="inline-block">
                        <span class="d-inline-block crypto-name">Amazon Giftcards</span>
                        <span class="form-switch mx-3">
                            <input class="form-check-input" type="checkbox" role="switch">
                        </span>
                        <span class="material-icons text-primary three-dots">more_vert</span>
                    </div>
                    <span class="sub_cat">Sub-category</span>
                    <div class="inline-block">
                        <span class="d-inline-block crypto-name">Amazon Giftcards (100-200)</span>
                        <span class="form-switch mx-3">
                            <input class="form-check-input" type="checkbox" role="switch" checked>
                        </span>
                        <span class="material-icons text-primary three-dots">more_vert</span>
                    </div>
                    <div class="add-giftcard mt-2" title="add new sub category">
                        <span class="material-icons add-crypto">add</span>
                        <span>Add Subcategory</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="add-giftcard mt-2" title="add new giftcard">
            <span class="material-icons add-crypto">add</span>
            <span>Add new giftcard</span>
        </div>
    </div>

    <!-- bank column -->
    <div class="col-6 col-lg-4 bank-div mt-5">
        <p class="text-center mt-2 fw-bold fs-4 mb-1">Account Details</p>
        <form action="php/add_bank.php" method="POST" id="addBankForm">
            <div tabindex="-1" class="alert alert-danger d-none text-center" id="errorDiv" role="alert"></div>
            <div class="mt-1 my-3">
                <label for="bankname" class="form-label settings">Bank name</label>
                <select name="bank_name" class="form-select rad8" id="bankname" required>
                    <option value="" hidden disabled selected>Select bank</option>
                </select>
            </div>
            <div class="mt-1 my-3">
                <label for="accountnumber" class="form-label settings">Account number</label>
                <input name="account_number" type="text" class="form-control rad8" id="accountnumber" placeholder="Enter account number" maxlength="10" required>
            </div>
            <div class="mt-1 my-3">
                <label for="accountname" class="form-label settings">Account name</label>
                <input name="account_name" type="text" class="form-control rad8" id="accountname" placeholder="Enter account name" required>
            </div>
            <button type="submit" class="payment text-center mx-auto">Add account details</button>
        </form>
    </div>
</div>