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
        $this->fname = $fname;
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
    public function login(mysqli &$conn)
    {
        $login_query = "SELECT id, fname, verified, pword, email FROM users WHERE email = '{$this->email}'";
        $result = $conn->query($login_query);
        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            $password = $row["pword"];
            if ($row["verified"] == 1) {
                if (password_verify($this->pword, $password)) {
                    $_SESSION["id"] = $row["id"];
                    $_SESSION["fname"] = $row["fname"];
                    $_SESSION["email"] = $row["email"];
                    $session_id = substr(uniqid("sid"), 0, 13);
                    $_SESSION["session_id"] = $session_id;
                    $sql = "UPDATE users SET session_id='$session_id' WHERE email = '{$this->email}'";
                    if ($conn->query($sql)) {
                        echo "Success: Account found and verified!";
                    } else {
                        echo "Something went wrong";
                    }
                } else {
                    echo "Wrong password!";
                }
            } else {
                echo "Your email is not verified! Check your mail";
            }
        } else {
            echo "Invalid email address";
        }
    }
    public function register(mysqli &$conn)
    {
        // TODO: change url 
        $verify_url = "http://localhost/fabex/php/verify_email.php?email=" . $this->email . "&verify=";
        $code = md5($this->email . $this->phone . $this->email);
        $verify_url = $verify_url . $code;
        $email_query = "SELECT email FROM users WHERE email = '{$this->email}'";
        $email_result = $conn->query($email_query);
        $register_query =
            "INSERT INTO users (fname, lname, email, pword, phone, v_code) 
            VALUES ('{$this->fname}', '{$this->lname}', '{$this->email}', '{$this->pword}', '{$this->phone}', '$code')";
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
                sendEmail("register", $verify_url, $this->email, $conn, $this->fname, $last_id);
            } else {
                echo "Something went wrong!" . $conn->error;
            }
        }
        $conn->close();
    }
    public function addBank(mysqli &$conn)
    {
        $sql = "SELECT email, fname FROM users WHERE id='{$this->id}'";
        $res = $conn->query($sql);
        if ($res == false || $res->num_rows != 1) exit("Invalid param " . $conn->close());
        $row = $res->fetch_assoc();
        $_SESSION['fname'] = $row["fname"];
        $_SESSION['email'] = $row["email"];
        $query = "UPDATE users SET bank_name='{$this->bank_name}', account_number='{$this->account_number}', bvn='{$this->bvn}' WHERE id='{$this->id}'";
        $bank_query = $conn->query($query);
        if ($bank_query === true) {
            echo "Bank details added successfully";
        } else {
            echo "Error updating record: " . $conn->error;
        }
    }
    public function resetPassword(mysqli &$conn)
    {
        // TODO: change url
        $verify_url = "http://localhost/fabex/php/reset_password.php?email=" . $this->email . "&verify=";
        $code = md5($this->email . time());
        $verify_url = $verify_url . $code;
        $query = "SELECT id, fname FROM users WHERE email='{$this->email}'";
        $res = $conn->query($query);
        if ($res->num_rows > 0) {
            $row = $res->fetch_assoc();
            $sql = "UPDATE users SET v_code='$code' WHERE id='{$row['id']}'";
            $fname = $row["fname"];
            $result = $conn->query($sql);
            if ($result === true) {
                sendEmail("reset", $verify_url, $this->email, $conn, $fname);
            }
        } else {
            echo "Account does not exist!";
        }
    }
    public function changePassword(mysqli &$conn)
    {
        $query = "UPDATE users SET pword='{$this->pword}'WHERE id='{$this->id}'";
        $bank_query = $conn->query($query);
        if ($bank_query === true) {
            echo "Password changed successfully";
        } else {
            echo "Error updating record: " . $conn->error;
        }
    }
    public function changeInfo(mysqli &$conn)
    {
        $sql = "UPDATE users SET fname='{$this->fname}', lname='{$this->lname}' ,phone='{$this->phone}',
         bank_name='{$this->bank_name}', account_number='{$this->account_number}' WHERE id='{$this->id}'";
        $result = $conn->query($sql);
        if ($result === true) {
            echo "Success: info updated!";
        } else {
            exit("Error occur when updating record: " . $conn->error);
        }
    }

    public function changeCurrentPassword(mysqli &$conn, string $newPass)
    {
        //get current password
        $sql = "SELECT pword FROM users WHERE id='{$this->id}'";
        $res = $conn->query($sql);
        if ($res == true && $res->num_rows == 1) {
            $r = $res->fetch_assoc();
            $pword = $r['pword'];
            if (password_verify($this->pword, $pword)) {
                $query = "UPDATE users SET pword='$newPass' WHERE id='{$this->id}'";
                $bank_query = $conn->query($query);
                if ($bank_query === true) {
                    echo "Password changed successfully";
                } else {
                    echo "Error updating record: " . $conn->error;
                }
            } else {
                exit("Current password wrong!");
            }
        }
    }
}
