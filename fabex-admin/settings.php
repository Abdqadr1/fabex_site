<div class="row justify-content-start justify-content-lg-around mx-0 p-4">
    <!-- crypto column -->
    <div class="col-6 col-lg-4">
        <div class="no-margin pad">
            <h3>Crypto</h3>
            <div class="mx-0 mt-2" id="crypto_div">
                <!-- each crypto -->
                <!-- <div class="each-crypto">
                    <span class="d-inline-block crypto-name">Bitcoin (BTC)</span>
                    <span class="form-switch mx-3">
                        <input class="form-check-input" type="checkbox" role="switch">
                    </span>
                    <span class="material-icons text-primary three-dots">more_vert</span>
                </div> -->
            </div>
            <div class="add-crypto mt-2" title="add new crypto" id="add_crypto">
                <span class="material-icons add-crypto">add</span>
                <span>Add new crypto</span>
            </div>
            <form class="d-none" action="php/add_crypto.php" method="POST" id="add_crypto_form">
                <div tabindex="-1" class="my-2 alert alert-danger mx-0 d-none text-center" id="errorDiv" role="alert"></div>
                <!-- coin name -->
                <div class="mt-2">
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
                    <select name="network" class="form-select rad8" id="network" required>
                        <option value="" selected disabled hidden>Select option</option>
                        <option value="BSC">BSC</option>
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
            <div class="mx-0 mt-2" id="giftcard_div">
                <!-- <div class="cap">
                    <div class="each-giftcard">
                        <div class="inline-block">
                            <span class="d-inline-block crypto-name">Amazon Giftcards</span>
                            <span class="form-switch mx-3">
                                <input class="form-check-input" type="checkbox" role="switch">
                            </span>
                            <span class="material-icons text-primary three-dots">more_vert</span>
                        </div>
                        <div id=""></div>
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
                    <div class="mt-3" id="add_new_giftcard_div">
                        <form action="" method="post" id="add_new_sub_form">
                            <div class="mt-1 my-3">
                                <label for="add_sub" class="form-label settings">Add sub-category (Amazon Giftcards)</label>
                                <input name="sub_cat_name" type="text" class="form-control rad8" id="add_sub" placeholder="e.g Amazon Giftcard" required>
                            </div>
                            <input type="hidden" name="which" value="sub_category">
                            <input type="hidden" name="parent" value="parent_id">
                            <button type="submit" class="payment text-center mx-auto">Add Sub-category</button>
                        </form>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="add-giftcard mt-2" title="add new giftcard" id="add_giftcard">
            <span class="material-icons add-crypto">add</span>
            <span>Add new giftcard</span>
        </div>
        <div class="pad d-none" id="giftcardFormDiv">
            <form action="php/add_giftcard.php" method="POST" id="add_new_giftcard_form">
                <div tabindex="-1" class="alert alert-danger mt-2 mx-0 d-none text-center" id="errorDiv" role="alert"></div>
                <div class="mt-2">
                    <label for="add_giftcard" class="form-label settings">Giftcard name</label>
                    <input name="giftcard_name" type="text" class="form-control rad8" id="add_giftcard" placeholder="e.g Amazon Giftcard" required>
                </div>
                <input type="hidden" name="which" value="category">
                <button type="submit" class="payment text-center mx-auto">Add New Giftcard</button>
            </form>
        </div>
    </div>
    <!-- bank column -->
    <div class="col-6 col-lg-4 bank-div mt-5">
        <p class="text-center mt-2 fw-bold fs-4 mb-1">Account Details</p>
        <form action="php/add_bank.php" method="POST" id="addBankForm">
            <div tabindex="-1" class="alert alert-danger d-none text-center" id="errorDiv" role="alert"></div>
            <div tabindex="-2" class="alert alert-success d-none text-center" id="successDiv" role="alert"></div>
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