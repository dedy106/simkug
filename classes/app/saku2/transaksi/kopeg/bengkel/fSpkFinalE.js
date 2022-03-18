window.app_saku2_transaksi_kopeg_bengkel_fSpkFinalE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_bengkel_fSpkFinalE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_bengkel_fSpkFinalE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Finalisasi SPK: Edit", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Final", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,460], childPage:["Detail SPK","Catatan"]});						
		this.e_nospk = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,202,20],caption:"No SPK", readOnly:true});						
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[0],{bound:[268,13,202,20],caption:"Jenis", readOnly:true});						
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,13,450,20],caption:"Tanggal", readOnly:true});										
		this.e_nopol = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"No Polisi", readOnly:true});						
		this.e_merk = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,14,450,20],caption:"Mek KBM - Tahun", readOnly:true});								
		this.e_cust = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Customer", maxLenght:50});												
		this.e_tipe = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,16,450,20],caption:"Tipe - Merk AC", readOnly:true});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Alamat", readOnly:true});												
		this.e_tel = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,17,450,20],caption:"No Telpon", readOnly:true});												
		this.e_keluhan = new saiMemo(this.pc1.childPage[0],{bound:[20,12,450,50],caption:"Keluhan",tag:9});		
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,20,this.pc1.width-10,this.pc1.height-215],colCount:9,tag:9,
		            colTitle:["Kode","Nama","No Brg","Tipe","Satuan","Jumlah","Harga","Total","Jenis"],					
					colWidth:[[8,7,6,5,4,3,2,1,0],[50,80,80,80,40,150,150,200,100]],					
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],					
					readOnly:true,defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		
		this.e_s = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Suction (S)", tag:9, maxLentgh:20});
		this.e_p = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Pressure (P)", tag:9, maxLentgh:20});
		this.e_t = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Temperature (T)",tag:9, maxLentgh:20});
		this.e_memosa = new saiMemo(this.pc1.childPage[1],{bound:[20,16,450,100],caption:"Catatan SA",tag:9});		
		this.e_sa = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"SA", readOnly:true});														
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);			
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select kode_gudang from fri_petugas where nik ='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.kodeGudang = line.kode_gudang;
				} 				
			}						
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.e_keluhan.setReadOnly(true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_bengkel_fSpkFinalE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_bengkel_fSpkFinalE.implement({
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
	simpan: function(){			
		try{					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();															
					sql.add("update fri_spk_m set no_final='-',progress='1',catatan='-',s='-',p='-',t='-' where no_spk='"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_final_m where no_final='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update fri_spk_m set no_final='"+this.e_nb.getText()+"',progress='2',catatan='"+this.e_memosa.getText()+"',s='"+this.e_s.getText()+"',p='"+this.e_p.getText()+"',t='"+this.e_t.getText()+"' where no_spk='"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into fri_final_m(no_final,kode_lokasi,tanggal,no_spk,kode_gudang,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_nospk.getText()+"','"+this.kodeGudang+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
										
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg1.clear(1); 					
					this.e_memosa.setText("-"); this.e_keluhan.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);											
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :
				this.sg1.validasi();				
				this.pc1.setActivePage(this.pc1.childPage[0]);											
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("update fri_spk_m set no_final='-',progress='1',catatan='-',s='-',p='-',t='-' where no_spk='"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from fri_final_m where no_final='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}				
	},					
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doChange:function(sender){			
		if (sender == this.e_periode && this.e_periode.getText() != "") {										 
			this.e_nb.setSQL("select a.no_final,b.no_spk from fri_final_m a inner join fri_spk_m b on a.no_final=b.no_final and a.kode_lokasi=b.kode_lokasi "+
							 "where a.nik_user='"+this.app._userLog+"' and b.no_jual='-' and b.kode_gudang='"+this.kodeGudang+"' and b.kode_lokasi='"+this.app._lokasi+"'",["no_final","no_spk"],false,["No Final","No SPK"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var strSQL = "select a.tanggal as tgl, "+
							 "b.no_spk,convert(varchar,b.tanggal,103) as tanggal,b.jenis,b.no_polisi,b.merk+' - '+b.tahun as merk,b.tipe,b.nik_user+' - '+d.nama as sa,b.keluhan,b.jenis+'-'+b.status as jnssts,b.cust,b.alamat,b.no_tel,b.catatan,b.s,b.p,b.t "+ 
							 "from fri_final_m a inner join fri_spk_m b on b.no_final=a.no_final and b.kode_lokasi=a.kode_lokasi "+
							 "                   inner join karyawan d on b.nik_user=d.nik and b.kode_lokasi=b.kode_lokasi "+
							 "where a.no_final='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																										
					this.dp_d1.setText(line.tgl);															
					this.e_nospk.setText(line.no_spk);
					this.e_jenis.setText(line.jnssts);
					this.e_tgl.setText(line.tgl);
					this.e_nopol.setText(line.no_polisi);
					this.e_merk.setText(line.merk);					
					this.e_tipe.setText(line.tipe);
					this.e_tgl.setText(line.tanggal);			
					this.e_cust.setText(line.cust);
					this.e_memosa.setText(line.catatan);
					this.e_keluhan.setText(line.keluhan);					
					this.e_alamat.setText(line.alamat);
					this.e_tel.setText(line.no_tel);
					this.e_sa.setText(line.sa);	
					this.e_s.setText(line.s);
					this.e_p.setText(line.p);
					this.e_t.setText(line.t);					
				} 
			}				
			var strSQL = "select 'INV' as jenis,b.kode_brg,b.nama+' - '+c.nama+' - '+d.nama as nama,b.no_brg,b.tipe,b.satuan,sum(a.jml) as jml,b.hj,sum((a.jml*b.hj)) as total "+
						 "from "+
						 "( "+
						 "	select kode_lokasi,kode_brg,sum(jumlah) as jml from fri_spk_d where no_spk = '"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,kode_brg  "+
						 "	union all  "+
						 "	select kode_lokasi,kode_brg,sum(jumlah*-1) as jml from fri_io_d where no_spk = '"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,kode_brg "+
						 ") a "+
						 "inner join fri_barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi     "+
						 "inner join fri_barang_jenis c on b.kode_jenis=c.kode_jenis and b.kode_lokasi=c.kode_lokasi "+
						 "inner join fri_barang_kbm d on b.kode_kbm=d.kode_kbm and b.kode_lokasi=d.kode_lokasi "+
						 "group by b.kode_brg,b.nama,c.nama,d.nama,b.no_brg,b.tipe,b.satuan,b.hj "+							 
						 "union all "+							 
						 "select 'NON' as jenis,'-' as kode_brg,a.item as nama,'-' as no_brg,'-' as tipe,a.satuan,sum(a.jml),0 as hj,0 as total "+
						 "from "+
						 "("+
						 "   select item,satuan,sum(jumlah) as jml from fri_spknon_d where no_spk = '"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by item,satuan "+ 
						 "   union all "+
						 "   select item,satuan,sum(jumlah*-1) as jml from fri_ionon_d where no_spk = '"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by item,satuan "+  
						 ") a group by a.item,a.satuan";
										
			var data1 = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg1.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];							
					this.sg1.appendData([line1.kode_brg,line1.nama,line1.no_brg,line1.tipe,line1.satuan,floatToNilai(line1.jml),floatToNilai(line1.hj),floatToNilai(line1.total),line1.jenis.toUpperCase()]);
				}
			}
			this.sg1.validasi();
		}								
	}
});