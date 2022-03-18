window.app_saku2_transaksi_kopeg_bengkel_fSpkFinal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_bengkel_fSpkFinal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_bengkel_fSpkFinal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Finalisasi SPK: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,500], childPage:["Data SPK","Detail SPK","Catatan","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:12,tag:0,
		            colTitle:["No SPK","Tanggal","Status","Customer","No Polisi","Tipe","Keluhan","Merk KBM","Tahun","Jenis","Status","SA"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[150,60,50,50,100,250,150,100,200,60,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Final",maxLength:30,readOnly:true,visible:false});		
				
		this.e_nospk = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,202,20],caption:"No SPK", readOnly:true});						
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[1],{bound:[268,13,202,20],caption:"Jenis", readOnly:true});						
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Tanggal", readOnly:true});										
		this.e_nopol = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"No Polisi", readOnly:true});						
		this.e_merk = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Mek KBM - Tahun", readOnly:true});								
		this.e_cust = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Customer",readOnly:true});												
		this.e_tipe = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Tipe - Merk AC", readOnly:true});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Alamat", readOnly:true});												
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"No Telpon", readOnly:true});												
		this.e_keluhan = new saiMemo(this.pc1.childPage[1],{bound:[20,12,450,50],caption:"Keluhan",tag:9});				
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,20,this.pc1.width-10,this.pc1.height-215],colCount:9,tag:9,
		            colTitle:["Kode","Nama","No Brg","Tipe","Satuan","Jumlah","Harga","Total","Jenis"],					
					colWidth:[[8,7,6,5,4,3,2,1,0],[50,80,80,80,40,150,150,200,100]],					
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],					
					readOnly:true,
					defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
				
		this.e_s = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"Suction (S)", tag:9, maxLentgh:20});
		this.e_p = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"Pressure (P)", tag:9, maxLentgh:20});
		this.e_t = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,200,20],caption:"Temperature (T)",tag:9, maxLentgh:20});
		this.e_memosa = new saiMemo(this.pc1.childPage[2],{bound:[20,16,450,100],caption:"Catatan SA",tag:9});		
		this.e_sa = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,18,450,20],caption:"SA", readOnly:true});														
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,11,200,20],caption:"No SPK",tag:9});
		this.e_nopolisi = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,12,200,20],caption:"No Polisi",tag:9});
		this.bCari = new button(this.pc1.childPage[3],{bound:[230,12,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
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
window.app_saku2_transaksi_kopeg_bengkel_fSpkFinal.extend(window.childForm);
window.app_saku2_transaksi_kopeg_bengkel_fSpkFinal.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fri_final_m","no_final",this.app._lokasi+"-FNL"+this.e_periode.getText().substr(2,4)+".","00000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
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
					this.sg.clear(1); this.sg1.clear(1); 
					this.doClick(this.i_gen);
					this.doLoad();
					this.e_memosa.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);											
					setTipeButton(tbSimpan);
				break;
			case "simpan" :
				this.sg1.validasi();				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
		this.doClick(this.i_gen);
		this.doLoad();
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fri_final_m","no_final",this.app._lokasi+"-FNL"+this.e_periode.getText().substr(2,4)+".","00000"));
		}		
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {							
				this.pc1.setActivePage(this.pc1.childPage[1]);						
				this.e_nospk.setText(this.sg.cells(0,row));			
				this.e_jenis.setText(this.sg.cells(9,row)+" - "+this.sg.cells(10,row));			
				this.e_nopol.setText(this.sg.cells(4,row));			
				this.e_merk.setText(this.sg.cells(7,row) +" "+this.sg.cells(8,row));			
				this.e_keluhan.setText(this.sg.cells(6,row));		
				this.e_tipe.setText(this.sg.cells(5,row));							
				this.e_tgl.setText(this.sg.cells(1,row));			
				this.e_memosa.setText("-");
				this.jenis = this.sg.cells(9,row);
				this.status = this.sg.cells(10,row);
				
				var data = this.dbLib.getDataProvider("select a.*,b.nik+' - '+b.nama as sa from fri_spk_m a inner join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+
				           "where a.no_spk='"+this.e_nospk.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_cust.setText(line.cust);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_tel);
						this.e_sa.setText(line.sa);
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
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select no_spk,convert(varchar,a.tanggal,103) as tanggal,case a.progress when '1' then 'FINAL' end as status,a.cust,a.no_polisi,a.tipe,a.keluhan,a.merk,a.tahun,jenis,a.status as sts,b.nik+'-'+b.nama as sa "+
		             "from fri_spk_m a "+					 
		             "inner join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+					 					 					 
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress = '1' and a.kode_gudang='"+this.kodeGudang+"' and a.nik_user='"+this.app._userLog+"'";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},
	doCari:function(sender){						
		var filter = "";		
		if (this.e_nobukti.getText()!="") filter = " where a.progress = '1' and a.no_spk='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_gudang='"+this.kodeGudang+"' and a.nik_user='"+this.app._userLog+"'";
		if (this.e_nopolisi.getText()!="") filter = " where a.progress = '1' and a.no_polisi like '%"+this.e_nopolisi.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_gudang='"+this.kodeGudang+"' and a.nik_user='"+this.app._userLog+"'";
		if (filter != "") {
			var strSQL = "select no_spk,convert(varchar,a.tanggal,103) as tanggal,case a.progress when '1' then 'FINAL' end as status,a.cust,a.no_polisi,a.tipe,a.keluhan,a.merk,a.tahun,jenis,a.status as sts "+
						 "from fri_spk_m a "+					 
						 "inner join karyawan b on a.nik_mekanik=b.nik and a.kode_lokasi=b.kode_lokasi "+filter;					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
		}
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.no_spk,line.tanggal,line.status.toUpperCase(),line.cust,line.no_polisi,line.tipe,line.keluhan,line.merk,line.tahun,line.jenis,line.sts,line.sa]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
	}
});