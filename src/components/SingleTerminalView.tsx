import React, { Suspense, lazy, useMemo, useState } from 'react';
import { ArrowLeftRight, Package, ShoppingCart, Store } from 'lucide-react';

import { LoadingState } from './ui/LoadingState';

const SalespersonView = lazy(() => import('./SalespersonView'));
const CashierView = lazy(() => import('./CashierView'));
const ProductManager = lazy(() => import('./ProductManager'));

interface SingleTerminalViewProps {
  branchId?: string | null;
  branchName?: string;
  branchEnabled?: boolean;
}

type TerminalTab = 'sales' | 'cashier' | 'inventory';

const VIEW_META: Record<
  TerminalTab,
  {
    label: string;
    icon: typeof ShoppingCart;
    title: string;
    subtitle: string;
  }
> = {
  sales: {
    label: 'البيع',
    icon: ShoppingCart,
    title: 'جارٍ تجهيز شاشة البيع',
    subtitle: 'نحمّل أدوات تسجيل الطلبات والبحث عن الأجهزة والإكسسوارات.',
  },
  cashier: {
    label: 'التحصيل',
    icon: Store,
    title: 'جارٍ تجهيز شاشة التحصيل',
    subtitle: 'نفتح لك الفواتير الجاهزة للمراجعة والتأكيد على نفس الجهاز.',
  },
  inventory: {
    label: 'المنتجات',
    icon: Package,
    title: 'جارٍ تجهيز شاشة المنتجات',
    subtitle: 'نحمّل إدارة الأجهزة والإكسسوارات والأسعار بسرعة.',
  },
};

const SingleTerminalView: React.FC<SingleTerminalViewProps> = ({ branchId, branchName, branchEnabled = false }) => {
  const [activeView, setActiveView] = useState<TerminalTab>('sales');
  const currentMeta = useMemo(() => VIEW_META[activeView], [activeView]);

  const renderView = () => {
    switch (activeView) {
      case 'sales':
        return <SalespersonView branchId={branchId} branchName={branchName} branchEnabled={branchEnabled} />;
      case 'cashier':
        return <CashierView branchId={branchId} branchName={branchName} branchEnabled={branchEnabled} />;
      case 'inventory':
        return <ProductManager />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-full px-4 py-4 sm:px-6 sm:py-8" dir="rtl">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-[2rem] border border-white/70 bg-white p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-black text-amber-700">
                <ArrowLeftRight className="h-4 w-4" />
                وضع تشغيل الجهاز الواحد
              </div>
              <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">تشغيل المحل من نفس الكمبيوتر</h1>
              <p className="mt-2 max-w-2xl text-sm font-bold leading-7 text-slate-500">
                تنقل بسرعة بين البيع والتحصيل وإدارة المنتجات بدون الحاجة لتسجيل خروج ودخول بين المستخدمين طوال اليوم.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 lg:min-w-[30rem]">
              {(Object.keys(VIEW_META) as TerminalTab[]).map((view) => {
                const meta = VIEW_META[view];
                const Icon = meta.icon;
                const isActive = activeView === view;

                return (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setActiveView(view)}
                    className={`rounded-[1.35rem] border px-4 py-4 text-right transition-all ${
                      isActive
                        ? 'border-amber-200 bg-amber-50 text-amber-900 shadow-[0_18px_45px_-30px_rgba(245,158,11,0.45)]'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                          isActive ? 'bg-amber-500 text-white' : 'bg-white text-slate-500'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black">{meta.label}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <Suspense fallback={<LoadingState title={currentMeta.title} subtitle={currentMeta.subtitle} className="w-full" />}>
          {renderView()}
        </Suspense>
      </div>
    </div>
  );
};

export default SingleTerminalView;
