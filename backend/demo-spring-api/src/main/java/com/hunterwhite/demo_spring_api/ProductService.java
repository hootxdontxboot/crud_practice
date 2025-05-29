package com.hunterwhite.demo_spring_api;
import java.util.List;

import org.springframework.stereotype.Service;

@Service

public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }
    public List<Product> getProducts (){
        return productRepository.findAll();
    }

    public Product getProduct(Long id) { return productRepository.findById(id).orElse(null);}

    public Product addProduct(Product product) {return productRepository.save(product);}

    public Product updateProduct(Product product) { return productRepository.save(product);}

    public void deleteProduct(Long id) { productRepository.deleteById(id);}



}
