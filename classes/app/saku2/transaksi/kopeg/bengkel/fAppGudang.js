window.app_saku2_transaksi_kopeg_bengkel_fAppGudang = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_bengkel_fAppGudang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_bengkel_fAppGudang";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Gudang: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,500], childPage:["Data SPK","Detail SPK","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:0,
		            colTitle:["No SPK","Tanggal","Status","Customer","No Polisi","Tipe","Keluhan","Merk KBM","Tahun","Jenis"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[50,50,100,250,150,100,200,60,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bengkel",maxLength:30,readOnly:true,visible:false});		
		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,202,20],caption:"Status Approval",items:["APPROVE","REVISI"], readOnly:true,tag:2});		
		this.e_nospk = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,202,20],caption:"No SPK", readOnly:true});						
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[1],{bound:[268,13,202,20],caption:"Jenis", readOnly:true});						
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Tanggal", readOnly:true});										
		this.e_nopol = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"No Polisi", readOnly:true});						
		this.e_merk = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Merk KBM - Tahun", readOnly:true});								
		this.e_tipe = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Tipe - Merk AC", readOnly:true});								
		this.e_user = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Customer", readOnly:true});										
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,12,450,50],caption:"Catatan Gudang",tag:9,readOnly:true});
		this.e_keluhan = new saiMemo(this.pc1.childPage[1],{bound:[520,12,450,50],caption:"Keluhan",tag:9});		
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,20,this.pc1.width-10,this.pc1.height-195],colCount:7,tag:9,
		            colTitle:["Kode","Nama","No Barang","Tipe","Satuan","Jumlah","Jenis"],					
					colWidth:[[6,5,4,3,2,1,0],[50,80,80,150,160,300,100]],					
					colFormat:[[5],[cfNilai]],					
					defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"No SPK",tag:9});
		this.e_nopolisi = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"No Polisi",tag:9});
		this.bCari = new button(this.pc1.childPage[2],{bound:[230,12,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
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
window.app_saku2_transaksi_kopeg_bengkel_fAppGudang.extend(window.childForm);
window.app_saku2_transaksi_kopeg_bengkel_fAppGudang.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ver_m","no_ver",this.app._lokasi+"-GD"+this.e_periode.getText().substr(2,4)+".","00000"));		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.c_status.getText()=="APPROVE")  var prog = "1";
					if (this.c_status.getText()=="REVISI")  var prog = "R";
					
					sql.add("update a set no_verseb ='"+this.e_nb.getText()+"' "+
					        "from ver_m a inner join ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi and a.no_verseb='-' "+
							"where b.no_bukti ='"+this.e_nospk.getText()+"' and b.modul='BENGKEL' and b.kode_lokasi='"+this.app._lokasi+"'");
							
					sql.add("update fri_spk_m set progress='"+prog+"',no_bengkel='"+this.e_nb.getText()+"' where no_spk='"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into ver_m (no_ver,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_verseb) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','BENGKEL','-')");
					
					sql.add("insert into ver_d (no_ver,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+prog+"','BENGKEL','"+this.e_nospk.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");					
					
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
					this.doClick();
					this.doLoad();
					this.e_memo.setText("-"); this.e_keluhan.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.c_status.setText("APPROVE");
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
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
		this.doClick();
		this.doLoad();
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ver_m","no_ver",this.app._lokasi+"-VKA"+this.e_periode.getText().substr(2,4)+".","000"));		
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {							
				this.pc1.setActivePage(this.pc1.childPage[1]);						
				this.e_nospk.setText(this.sg.cells(0,row));			
				this.e_jenis.setText(this.sg.cells(9,row));			
				this.e_nopol.setText(this.sg.cells(4,row));			
				this.e_merk.setText(this.sg.cells(7,row) +" "+this.sg.cells(8,row));			
				this.e_keluhan.setText(this.sg.cells(6,row));		
				this.e_tipe.setText(this.sg.cells(5,row));							
				this.e_tgl.setText(this.sg.cells(1,row));			
				this.e_user.setText(this.sg.cells(3,row));						
				this.e_memo.setText("-");

				var strSQL = "select 'INV' as jenis,b.kode_brg,b.nama+' - '+c.nama+' - '+d.nama as nama,b.no_brg,b.tipe,b.satuan,a.jumlah "+
							 "from fri_spk_d a inner join fri_barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
							 "                 inner join fri_barang_jenis c on b.kode_jenis=c.kode_jenis and b.kode_lokasi=c.kode_lokasi "+
							 "                 inner join fri_barang_kbm d on b.kode_kbm=d.kode_kbm and b.kode_lokasi=d.kode_lokasi "+
							 "where a.no_spk='"+this.e_nospk.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							 "union all "+
							 "select 'NON' as jenis,'-' as kode_brg,item as nama,'-' as merk,'-' as tipe,satuan,jumlah "+
							 "from fri_spknon_d where no_spk='"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							 "order by jenis";							
				var data1 = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg1.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];							
						this.sg1.appendData([line1.kode_brg,line1.nama,line1.no_brg,line1.tipe,line1.satuan,floatToNilai(line1.jumlah),line1.jenis.toUpperCase()]);
					}
				}
				this.sg1.validasi();
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select no_spk,convert(varchar,a.tanggal,103) as tanggal,case a.progress when '0' then 'SPK' when 'R' then 'REVISI' end as status,a.cust,a.no_polisi,a.tipe,a.keluhan,a.merk,a.tahun,jenis "+
		             "from fri_spk_m a "+					 		           
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('0') and a.kode_gudang='"+this.kodeGudang+"' ";			
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
		if (this.e_nobukti.getText()!="") filter = " where a.progress in ('0','R') and a.no_spk='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_gudang='"+this.kodeGudang+"'"; 
		if (this.e_nopolisi.getText()!="") filter = " where a.progress in ('0','R') and a.no_polisi like '%"+this.e_nopolisi.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"'  and a.kode_gudang='"+this.kodeGudang+"'"; 
		
		var strSQL = "select no_spk,convert(varchar,a.tanggal,103) as tanggal,case a.progress when '0' then 'SPK' when 'R' then 'REVISI' end as status,a.cust,a.no_polisi,a.tipe,a.keluhan,a.merk,a.tahun,jenis "+
		             "from fri_spk_m a "+ filter;					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
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
			this.sg.appendData([line.no_spk,line.tanggal,line.status.toUpperCase(),line.cust,line.no_polisi,line.tipe,line.keluhan,line.merk,line.tahun,line.jenis]);
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