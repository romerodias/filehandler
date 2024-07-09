package br.com.rdtecnologia.filehandler.application.domain;

import org.springframework.stereotype.Component;

import java.net.NetworkInterface;
import java.net.SocketException;

@Component
public class Audit {

    public void gerUserMacAddress() throws SocketException {
        byte[] mac = NetworkInterface.getNetworkInterfaces().nextElement().getHardwareAddress();
        System.out.print("MAC");



        StringBuilder sb = new StringBuilder(18);
        for (byte b : mac) {
            if (sb.length() > 0)
                sb.append(':');
            sb.append(String.format("%02x", b));
        }
        System.out.println(sb);
    }

}
