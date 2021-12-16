package com.ironhack.finalProject.paymentService.service.impl;

import com.ironhack.finalProject.paymentService.dao.Details;
import com.ironhack.finalProject.paymentService.dao.Item;
import com.ironhack.finalProject.paymentService.repository.ItemRepository;
import com.ironhack.finalProject.paymentService.service.interfaces.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ItemService implements IItemService {

    @Autowired
    private ItemRepository itemRepository;
//    private final ItemRepository itemRepository;
//
//    public ItemService(ItemRepository itemRepository) {
//        this.itemRepository = itemRepository;
//    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<Item> getById(Long id) {
        return itemRepository.findById(id);
    }

    public Optional<Item> getByProjectName(String projectName) {
        return itemRepository.findByProjectName(projectName);
    }

    public Item save(Details details) {
        Item item = new Item(details.getProjectName(), details.getPrice());
        return itemRepository.save(item);
    }

    public void delete(Long id) {
        itemRepository.deleteById(id);
    }

    public boolean existsId(Long id) {
        return itemRepository.existsById(id);
    }

    public boolean existsProjectName(String projectName) {
        if(getByProjectName(projectName).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

}
