package proyecto_tingeso_1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyecto_tingeso_1.DTOS.UserDTO;
import proyecto_tingeso_1.entity.UserEntity;
import proyecto_tingeso_1.repository.UserRepository;

import java.util.List;

@Service
// en este repositorio debe estar toda la logica de negocio
public class UserService {
    @Autowired
    UserRepository userRepository;

    public UserEntity getUserByRut(String rut){
        return userRepository.findByRut(rut);
    }
// create user make for kecycloack
    public UserEntity findByEmail(String email){
        return userRepository.findByEmail(email);
    }
    public List<UserEntity> findAll(){
        return userRepository.findAll();
    }

    public UserEntity create(UserDTO userDTO){
        UserEntity user = new UserEntity();
        user.setRut(userDTO.getRut());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setNationality(userDTO.getNationality());
        return userRepository.save(user);

    }
    //update no ready yet









}
