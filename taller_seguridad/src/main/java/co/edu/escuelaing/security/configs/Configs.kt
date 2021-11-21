package co.edu.escuelaing.security.configs

class Configs {
    companion object {
        fun getServerPort(): Int {
            val port = System.getenv("PORT")
            return port?.toInt() ?: 5000
        }
    }
}