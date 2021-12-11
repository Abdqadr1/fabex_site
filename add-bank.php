<?php include_once "header.php"; ?>

<body>
    <div class="body no-margin">
        <div class="row justify-content-center mt-4">
            <div class="col-9 col-md-5 col-lg-3" id="settings_pass_div">
                <img src="assets/images/FabEx.png" class="mx-auto d-block" alt="Logo">
                <p class="text-center mt-2 fw-bold fs-1 mb-1">One last step...</p>
                <p class="text-center fs-6">Add your bank details</p>
                <div class="mt-1 my-3">
                    <label for="bankname" class="form-label settings">Bank name</label>
                    <select class="form-select rad8" id="bankname">
                        <option selected>Kuda MFB</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="mt-1 my-3">
                    <label for="accountnumber" class="form-label settings">Account number</label>
                    <input type="text" class="form-control rad8" id="accountnumber" placeholder="2222225555">
                </div>
                <div class="mt-1 mt-3 mb-1">
                    <label for="bvn" class="form-label settings">Bank verification number</label>
                    <input type="text" class="form-control rad8" id="bvn" placeholder="2222225555">
                </div>
                <div class="row justify-content-center no-margin">
                    <button class="col-12 settings text-center mx-auto">Add account details</button>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>