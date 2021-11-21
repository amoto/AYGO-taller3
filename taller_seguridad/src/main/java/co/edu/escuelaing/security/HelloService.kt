package co.edu.escuelaing.security

import co.edu.escuelaing.security.configs.Configs
import spark.Spark.get
import spark.Spark.port
import spark.Spark.secure

fun main(args: Array<String>) {
    port(Configs.getServerPort())
    secure("keystore/ecikeystore.p12", "123456", null, null);
    get("/hello") { req, res -> "it works!" }
}

