window.app_saku_mb_transaksi_fHitungSdm = function(owner)
{
	if (owner)
	{
		window.app_saku_mb_transaksi_fHitungSdm.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_mb_transaksi_fHitungSdm";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Perhitungan SDM", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Gedung",btnClick:[this,"doBtnClick"],readOnly:true});
		this.cb_jenis = new portalui_saiCB(this,{bound:[20,11,200,20],caption:"Filter",items:["Jabatan","Kelompok Jabatan"]});
		this.bTampil = new portalui_button(this,{bound:[829,11,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
				
		this.p1 = new portalui_panel(this);
		this.p1.setTop(12);
		this.p1.setWidth(900);
		this.p1.setLeft(10);
		this.p1.setHeight(415);
		this.p1.setCaption("Hasil Perhitungan");
	
		this.sg1 = new portalui_saiTable(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(895);
		this.sg1.setHeight(389);
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_mb_transaksi_fHitungSdm.extend(window.portalui_childForm);
window.app_saku_mb_transaksi_fHitungSdm.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);															
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doTampilClick: function(sender){
		try{			
			//this.sg1.setColTitle(new Array("No","Jabatan","Batas Min","Batas Max","Nilai UMR"));
			if (this.cb_jenis.getText()=="Jabatan")
			{
				var sql="select a.nama,c.nama as kriteria,d.nilai as nilai_kriteria,a.bmin,a.bmax,b.jumlah,f.nilai as umr, "+
										 "ifnull(case when d.nilai>bmin then round(d.nilai/bmin)*b.jumlah end,0) as sdm, "+
										 "ifnull(case when d.nilai>bmin then round(d.nilai/bmin)*b.jumlah end,0)*f.nilai as nilai, "+
										 "ifnull(case when d.nilai>bmax then round(d.nilai/bmax)*b.jumlah end,0) as sdm_efisien, "+
										 "ifnull(case when d.nilai>bmax then round(d.nilai/bmax)*b.jumlah end,0)*f.nilai as nilai_efisien "+ 
										 "from mb_job a "+
										 "inner join mb_kriteria_job b on a.kode_job=b.kode_job "+
										 "inner join mb_kriteria c on b.kode_kriteria=c.kode_kriteria "+
										 "inner join mb_kriteria_gedung d on c.kode_kriteria=d.kode_kriteria and b.kode_indek=d.kode_indek and d.kode_gedung='"+this.cb_kode.getText()+"' "+
										 "inner join mb_gedung e on d.kode_gedung=e.kode_gedung "+
										 "inner join mb_umr f on e.kode_kota=f.kode_kota and f.tahun='2009' "+
										 "where e.kode_gedung='"+this.cb_kode.getText()+"' order by a.kode_job"

			}
			else
			{
				var sql="select g.nama,c.nama as kriteria,d.nilai as nilai_kriteria,sum(b.jumlah) as jumlah, "+
										 "sum(ifnull(case when d.nilai>bmin then round(d.nilai/bmin)*b.jumlah end,0)) as sdm, "+
										 "sum(ifnull(case when d.nilai>bmin then round(d.nilai/bmin)*b.jumlah end,0)*f.nilai) as nilai, "+
										 "sum(ifnull(case when d.nilai>bmax then round(d.nilai/bmax)*b.jumlah end,0)) as sdm_efisien, "+
										 "sum(ifnull(case when d.nilai>bmax then round(d.nilai/bmax)*b.jumlah end,0)*f.nilai) as nilai_efisien "+ 
										 "from mb_job a "+
										 "inner join mb_kriteria_job b on a.kode_job=b.kode_job "+
										 "inner join mb_kriteria c on b.kode_kriteria=c.kode_kriteria "+
										 "inner join mb_kriteria_gedung d on c.kode_kriteria=d.kode_kriteria and b.kode_indek=d.kode_indek and d.kode_gedung='"+this.cb_kode.getText()+"' "+
										 "inner join mb_gedung e on d.kode_gedung=e.kode_gedung "+
										 "inner join mb_umr f on e.kode_kota=f.kode_kota and f.tahun='2009' "+
										"inner join mb_job_klp g on a.kode_klpjob=g.kode_klpjob "+
										 "where e.kode_gedung='"+this.cb_kode.getText()+"' "+
										 "group by a.kode_klpjob ";
	
			}
			
			var data = this.dbLib.runSQL(sql);
			this.sg1.clearAll();
			this.sg1.setData(data);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_kode) 
			{   
			    this.standarLib.showListData(this, "Daftar Gedung",sender,undefined, 
											  "select kode_gedung, nama  from mb_gedung where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_gedung) from mb_gedung where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_gedung","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e)
			{
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});