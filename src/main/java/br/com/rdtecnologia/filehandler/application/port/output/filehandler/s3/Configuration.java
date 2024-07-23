package br.com.rdtecnologia.filehandler.application.port.output.filehandler.s3;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.InstanceProfileCredentialsProvider;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

@org.springframework.context.annotation.Configuration
public class Configuration {

    @Value("${file.operations.s3.bucket.region}")
    private String bucketRegion;

    @Bean
    @Primary
    @Profile("!production")
    @Qualifier("s3client")
    public AmazonS3 s3client() {

        InstanceProfileCredentialsProvider credentials =
                 InstanceProfileCredentialsProvider.createAsyncRefreshingProvider(true);

        return AmazonS3ClientBuilder.standard()
            //.withEndpointConfiguration(new EndpointConfiguration("http://0.0.0.0:4566", bucketRegion))
            .withCredentials(credentials)
            .build();
    }

    @Bean
    @Primary
    @Profile("production")
    @Qualifier("s3client")
    public AmazonS3 s3clientProduction() {
        return AmazonS3ClientBuilder
            .standard()
            .withRegion(bucketRegion)
            .build();
    }
}
