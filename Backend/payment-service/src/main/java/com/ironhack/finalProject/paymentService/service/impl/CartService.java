//package com.ironhack.finalProject.paymentService.service.impl;
//
//import com.ironhack.finalProject.paymentService.dao.Cart;
//import com.ironhack.finalProject.paymentService.controller.dto.DetailsDTO;
//import com.ironhack.finalProject.paymentService.repository.CartRepository;
//import org.apache.catalina.User;
//import org.springframework.stereotype.Service;
//
//import javax.transaction.Transactional;
//
//@Service
//@Transactional
//public class CartService {
//
//    private final CartRepository cartRepository;
//
//    public CartService(CartRepository cartRepository){
//        this.cartRepository = cartRepository;
//    }
//
//    public void addToCart(DetailsDTO product, User user){
//        Cart cart = new Cart(product, user);
//        cartRepository.save(cart);
//    }
//
//
//    public CartDto listCartItems(User user) {
//        List<Cart> cartList = cartRepository.findAllByUserOrderByCreatedDateDesc(user);
//        List<CartItemDto> cartItems = new ArrayList<>();
//        for (Cart cart:cartList){
//            CartItemDto cartItemDto = getDtoFromCart(cart);
//            cartItems.add(cartItemDto);
//        }
//        double totalCost = 0;
//        for (CartItemDto cartItemDto :cartItems){
//            totalCost += (cartItemDto.getProduct().getPrice()* cartItemDto.getQuantity());
//        }
//        return new CartDto(cartItems,totalCost);
//    }
//
//
//    public static CartItemDto getDtoFromCart(Cart cart) {
//        return new CartItemDto(cart);
//    }
//
//
//    public void updateCartItem(AddToCartDto cartDto, User user,Product product){
//        Cart cart = cartRepository.getOne(cartDto.getId());
//        cart.setQuantity(cartDto.getQuantity());
//        cart.setCreatedDate(new Date());
//        cartRepository.save(cart);
//    }
//
//    public void deleteCartItem(int id,int userId) throws CartItemNotExistException {
//        if (!cartRepository.existsById(id))
//            throw new CartItemNotExistException("Cart id is invalid : " + id);
//        cartRepository.deleteById(id);
//
//    }
//
//    public void deleteCartItems(int userId) {
//        cartRepository.deleteAll();
//    }
//
//
//    public void deleteUserCartItems(User user) {
//        cartRepository.deleteByUser(user);
//    }
//}