<?php
class User
{
    private $id, $name, $email = "", $pword, $address, $city, $zipcode;
    function __construct($email, $pword)
    {
        $this->email = $email;
        $this->pword = $pword;
    }
    public function setFname(string $name)
    {
        $this->id = $name;
    }
    public function setZip(string $zipcode)
    {
        $this->zipcode = $zipcode;
    }
    public function setAddress(string $address)
    {
        $this->address = $address;
    }
    public function setCity(string $city)
    {
        $this->city = $city;
    }
    public function setPword(string $pass)
    {
        $this->pword = $pass;
    }
    public function setLname(string $name)
    {
        $this->lname = $name;
    }
    public function setEmail(string $email)
    {
        $this->email = $email;
    }
    public function login(mysqli $conn)
    {
        $login_query = "SELECT id FROM users WHERE email = '{$this->email}' AND pword = '{$this->pword}'";
        $result = $conn->query($login_query);
        if ($result->num_rows > 0) {
            echo "Account found successfully!";
        } else {
            echo "Invalid email or password!";
        }
    }
    public function register(mysqli &$conn)
    {
        $email_query = "SELECT email FROM users WHERE email = '{$this->email}'";
        $email_result = $conn->query($email_query);
        $register_query =
            "INSERT INTO users (fname, lname, email, pword, address, city, zipcode) 
            VALUES ('{$this->fname}', '{$this->lname}', '{$this->email}', '{$this->pword}', '{$this->address}',
            '{$this->city}', '{$this->zipcode}')";
        if ($email_result->num_rows > 0) {
            // output data of each row
            echo "Email already exists!";
        } else {
            $insert_result = $conn->query($register_query);
            if ($insert_result === TRUE) {
                echo "Account with " . $conn->last_id . "created successfully!";
            } else {
                echo "Something went wrong!" . $conn->error;
            }
        }
        $conn->close();
    }
    public function editInfo()
    {
    }
}
