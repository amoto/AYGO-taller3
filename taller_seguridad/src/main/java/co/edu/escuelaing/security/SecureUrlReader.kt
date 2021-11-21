package co.edu.escuelaing.security

import java.io.BufferedReader
import java.io.File
import java.io.FileInputStream
import java.io.InputStreamReader
import java.lang.Exception
import java.net.URL
import java.security.KeyStore
import javax.net.ssl.SSLContext
import javax.net.ssl.TrustManagerFactory

fun main() {
    changeSSLContext()
    readURL("https://localhost:5000/hello")
    readURL("https://www.google.com")
}

private fun changeSSLContext() {
    // Create a file and a password representation
    val trustStoreFile = File("keystore/myTrustStore")
    val trustStorePassword = "123456".toCharArray()
    // Load the trust store, the default type is "pkcs12", the alternative is "jks"
    val trustStore = KeyStore.getInstance(KeyStore.getDefaultType())
    trustStore.load(FileInputStream(trustStoreFile), trustStorePassword)
    // Get the singleton instance of the TrustManagerFactory
    val tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm())

    // Itit the TrustManagerFactory using the truststore object
    tmf.init(trustStore)

    //Set the default global SSLContext so all the connections will use it
    val sslContext: SSLContext = SSLContext.getInstance("TLS")
    sslContext.init(null, tmf.trustManagers, null)
    SSLContext.setDefault(sslContext)
}

private fun readURL(s: String) {
    try {
        val url = URL(s)
        val conn = url.openConnection()
        println("-----------------Headers-------------")
        conn.headerFields.forEach { (k, v) -> println("$k -> $v") }
        println("-----------------Body----------------")
        val br = BufferedReader(InputStreamReader(conn.getInputStream()))
        br.lines().forEach { println(it) }
    } catch (ex: Exception) {
        ex.printStackTrace()
    }
}