package com.hunterwhite.demo_spring_api;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }
    @GetMapping("/products")
    @CrossOrigin
    public List<Product> getPoducts(){
        return productService.getProducts();
    }
    @GetMapping("/product/{id}")
    public Product getProduct(@PathVariable("id") Long id) {return productService.getProduct(id);}

    @PutMapping("/product/{id}")
    @CrossOrigin
    public Product updateProduct(@RequestBody() Product product, @PathVariable("id") Long id){
        return productService.updateProduct(product);
    }
    
    @PostMapping("/products")
    @CrossOrigin
    public ResponseEntity<Product> addNew (@RequestBody() Product product){
        Product newproduct = productService.addProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(newproduct);
    }

    @DeleteMapping("/product/{id}")
    @CrossOrigin
    public void deleteProduct(@PathVariable("id") Long id) {productService.deleteProduct(id);}

    
}
