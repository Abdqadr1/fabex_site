<?php
class User
{
    private $id, $fname, $lname, $email = "", $pword, $phone, $bank_name, $account_number, $account_name, $bvn;
    function __construct($email, $pword)
    {
        $this->email = $email;
        $this->pword = $pword;
    }
    public function setId($id)
    {
        $this->id = $id;
    }
    public function setBankName(string $name)
    {
        $this->bank_name = $name;
    }
    public function setAccountName(string $name)
    {
        $this->account_name = $name;
    }
    public function setAccountNumber(string $number)
    {
        $this->account_number = $number;
    }
    public function setBvn(string $bvn)
    {
        $this->bvn = $bvn;
    }
    public function setFname(string $fname)
    {
        $this->id = $fname;
    }
    public function setPhone(string $phone)
    {
        $this->phone = $phone;
    }
    public function setPword(string $pass)
    {
        $this->pword = $pass;
    }
    public function setLname(string $lname)
    {
        $this->lname = $lname;
    }
    public function setEmail(string $email)
    {
        $this->email = $email;
    }
    public function login(mysqli $conn)
    {
        $login_query = "SELECT id, fname FROM users WHERE email = '{$this->email}' AND pword = '{$this->pword}'";
        $result = $conn->query($login_query);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $_SESSION["id"] = $row["id"];
            $_SESSION["fname"] = $row["fname"];
            echo $row["fname"];
            echo "Success: Account found!";
        } else {
            echo "Invalid email or password!";
        }
    }
    public function register(mysqli &$conn)
    {
        $email_query = "SELECT email FROM users WHERE email = '{$this->email}'";
        $email_result = $conn->query($email_query);
        $register_query =
            "INSERT INTO users (fname, lname, email, pword, phone) 
            VALUES ('{$this->fname}', '{$this->lname}', '{$this->email}', '{$this->pword}', '{$this->phone}')";
        if ($email_result->num_rows > 0) {
            // output data of each row
            echo "Email already exists!";
        } else {
            $insert_result = $conn->query($register_query);
            if ($insert_result === TRUE) {
                $last_id = $conn->insert_id;
                $_SESSION["email"] = $this->email;
                $_SESSION["fname"] = $this->fname;
                $_SESSION["id"] = $last_id;
                echo "Account created successfully! " . $last_id;
            } else {
                echo "Something went wrong!" . $conn->error;
            }
        }
        $conn->close();
    }
    public function addBank(mysqli &$conn)
    {
        $query = "UPDATE users SET bank_name='{$this->bank_name}', account_number='{$this->account_number}',
        account_name='{$this->account_name}', bvn='{$this->bvn}' WHERE id='{$this->id}'";
        $bank_query = $conn->query($query);
        if ($bank_query === true) {
            echo "Bank details added successfully";
        } else {
            echo "Error updating record: " . $conn->error;
        }
    }
    public function editInfo()
    {
    }
}
