import React from 'react';
import {
  Package,
  FolderTree,
  Sparkles,
  Eye,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ShoppingBag,
  Users,
  IndianRupee,
  Truck,
  Clock,
  ExternalLink,
} from 'lucide-react';
import GreetingSection from '../components/dashboard/GreetingSection';
import StatCard from '../components/dashboard/StatCard';
import ProductCard from '../components/products/ProductCard';
import { StatSkeleton, ProductSkeleton } from '../components/common/LoadingSkeleton';
import Badge from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export default function DashboardHome() {
  const {
    stats,
    loadingStats,
    setActiveTab,
    setIsAddProductOpen,
    setEditingProduct,
    setViewingProduct,
    orders,
    setViewingOrder,
  } = useApp();

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsAddProductOpen(true);
  };

  const handleView = (product) => {
    setViewingProduct(product);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAddProductOpen(true);
  };

  const formattedSales = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(stats?.totalSales || 0);

  const recentOrdersList = stats?.recentOrders || orders?.slice(0, 5) || [];
  const lowStockItems = stats?.lowStockProducts || [];

  const getOrderStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'Shipped':
        return <Badge variant="gold">Shipped</Badge>;
      case 'Processing':
        return <Badge variant="processing">Processing</Badge>;
      case 'Confirmed':
        return <Badge variant="taupe">Confirmed</Badge>;
      case 'Cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status || 'Processing'}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* 1. Greeting Section */}
      <GreetingSection />

      {/* 2. Executive KPI Cards Grid */}
      <section aria-label="Store Statistics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {loadingStats || !stats ? (
            <>
              <StatSkeleton />
              <StatSkeleton />
              <StatSkeleton />
              <StatSkeleton />
            </>
          ) : (
            <>
              {/* Total Revenue */}
              <StatCard
                title="Gross Sales"
                value={formattedSales}
                subtitle={`${stats.totalOrders || 0} customer orders completed`}
                icon={IndianRupee}
                iconBg="bg-[#EDF5F0]"
                iconColor="text-[#18412F]"
                onClick={() => setActiveTab('orders')}
              />

              {/* Total Orders */}
              <StatCard
                title="Total Orders"
                value={stats.totalOrders || 0}
                subtitle="White Glove & Direct fulfillment"
                icon={ShoppingBag}
                iconBg="bg-[#FAF3EA]"
                iconColor="text-[#9A6735]"
                onClick={() => setActiveTab('orders')}
              />

              {/* Total Products */}
              <StatCard
                title="Active Catalog"
                value={stats.totalProducts || 0}
                subtitle={`${stats.lowStockCount || 0} items low in stock`}
                icon={Package}
                iconBg="bg-[#F4EFFB]"
                iconColor="text-[#683FA0]"
                onClick={() => setActiveTab('products')}
              />

              {/* Total Patrons / Users */}
              <StatCard
                title="Registered Patrons"
                value={stats.totalUsers || 0}
                subtitle="Customer & trade accounts"
                icon={Users}
                iconBg="bg-[#EBF3FB]"
                iconColor="text-[#1D63A8]"
                onClick={() => setActiveTab('customers')}
              />
            </>
          )}
        </div>
      </section>

      {/* 3. Status Pipeline & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Status Pipeline Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EAE4D9] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE4D9]">
              <div>
                <h3 className="text-base font-serif font-bold text-[#191816]">
                  Order Fulfillment Pipeline
                </h3>
                <p className="text-xs text-[#8C8275]">
                  Status counts synchronized with PostgreSQL backend
                </p>
              </div>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-bold text-[#18412F] hover:underline flex items-center gap-1"
              >
                <span>View All Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
              {['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((status) => {
                const countObj = stats?.statusCounts?.find(
                  (s) => s._id?.toLowerCase() === status.toLowerCase()
                );
                const count = countObj ? countObj.count : 0;
                return (
                  <div
                    key={status}
                    onClick={() => setActiveTab('orders')}
                    className="p-3.5 rounded-xl bg-[#F9F7F2] border border-[#EAE4D9] hover:border-[#18412F] cursor-pointer transition-all text-center"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C8275] block truncate">
                      {status}
                    </span>
                    <span className="text-2xl font-bold text-[#191816] mt-1 block">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#EAE4D9] flex items-center justify-between text-xs text-[#8C8275]">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#18412F]" />
              Standard White Glove Delivery Active
            </span>
            <span className="font-semibold text-[#18412F]">
              Express Assembly Guaranteed
            </span>
          </div>
        </div>

        {/* Low Stock Warning Card */}
        <div className="bg-white rounded-2xl border border-[#EAE4D9] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE4D9]">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <h3 className="text-base font-serif font-bold text-[#191816]">
                  Inventory Alerts
                </h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                {stats?.lowStockCount || 0} Low Stock
              </span>
            </div>

            <div className="mt-3 space-y-2.5">
              {lowStockItems.length > 0 ? (
                lowStockItems.slice(0, 4).map((p) => (
                  <div
                    key={p._id || p.id}
                    onClick={() => {
                      setViewingProduct(p);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE4D9] hover:border-amber-400 cursor-pointer transition-all"
                  >
                    <div className="truncate mr-2">
                      <p className="text-xs font-bold text-[#191816] truncate">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-[#8C8275]">{p.category} • {p.room}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[11px] font-bold shrink-0">
                      {p.stock} left
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-[#8C8275] bg-[#FAF8F5] rounded-xl border border-[#EAE4D9]">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  All catalog items healthy (&gt; 5 stock)
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('inventory')}
            className="w-full mt-4 py-2 px-3 rounded-xl bg-[#F9F7F2] hover:bg-[#EAE4D9] text-[#191816] text-xs font-bold border border-[#EAE4D9] transition-colors text-center"
          >
            Manage Inventory & Stock
          </button>
        </div>
      </div>

      {/* 4. Recent Customer Orders Section */}
      <section aria-label="Recent Orders" className="bg-white rounded-2xl border border-[#EAE4D9] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE4D9]">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#191816]">
              Recent Showroom Orders
            </h3>
            <p className="text-xs text-[#8C8275]">
              Real-time customer purchases and delivery status
            </p>
          </div>

          <button
            onClick={() => setActiveTab('orders')}
            className="text-xs font-bold text-[#18412F] hover:underline flex items-center gap-1"
          >
            <span>Open Orders Manager</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {recentOrdersList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EAE4D9] text-[11px] font-bold uppercase tracking-wider text-[#8C8275]">
                  <th className="py-2.5 px-3">Order Number</th>
                  <th className="py-2.5 px-3">Patron Name</th>
                  <th className="py-2.5 px-3">Fulfillment</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE4D9]/60 text-xs">
                {recentOrdersList.map((ord) => {
                  const customerName =
                    ord.customerDetails?.fullName ||
                    ord.customer?.name ||
                    'Aanya Sharma';
                  const orderNum = ord.orderNumber || ord.id || 'ANS-2026';
                  const amount = ord.total
                    ? `₹${ord.total.toLocaleString('en-IN')}`
                    : '₹68,999';

                  return (
                    <tr key={ord._id || ord.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#18412F]">
                        {orderNum}
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#191816]">
                        {customerName}
                      </td>
                      <td className="py-3 px-3 text-[#8C8275]">
                        {ord.deliveryMethod || 'Standard White Glove'}
                      </td>
                      <td className="py-3 px-3 font-bold text-[#191816]">
                        {amount}
                      </td>
                      <td className="py-3 px-3">
                        {getOrderStatusBadge(ord.status || ord.orderStatus)}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            setViewingOrder(ord);
                            setActiveTab('orders');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#F9F7F2] hover:bg-[#EAE4D9] text-[#191816] font-semibold text-[11px] border border-[#EAE4D9]"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center bg-[#FAF8F5] rounded-xl border border-[#EAE4D9]">
            <p className="text-xs text-[#8C8275]">No recent orders found.</p>
          </div>
        )}
      </section>

      {/* 5. Quick Add & Catalog Bar */}
      <div className="bg-[#123324] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#A7C7B7] font-semibold block mb-1">
            Master Artisan Catalog
          </span>
          <h3 className="text-2xl font-serif font-bold text-white">
            Expand Your Showroom Offerings
          </h3>
          <p className="text-xs sm:text-sm text-[#D0E3D9] mt-1 max-w-xl">
            Add new teakwood pieces, curved sofas, dining suites, or lamps with full Prisma specifications.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleOpenAdd}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#123324] font-bold text-sm shadow-md hover:bg-[#FAF7F2] transition-all"
          >
            <Plus className="w-4 h-4 text-[#123324]" />
            <span>Add New Product</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
          >
            <span>View All Catalog</span>
          </button>
        </div>
      </div>
    </div>
  );
}
