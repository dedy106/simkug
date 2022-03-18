window.app_sc_transaksi_fPesanOrder = function(owner)
{
	if (owner)
	{
		window.app_sc_transaksi_fPesanOrder.prototype.parent.constructor.call(this,owner);
		this.className  = "app_sc_transaksi_fPesanOrder";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Purcase Order: Input", 0);	
		
		uses("radioButton;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;saiMemo");		
		this.dp_d1 = new portalui_datePicker(this,{bound:[0,1,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		
		this.p1 = new panel(this,{bound:[0,0,1020,555],caption:" ",visible:true});
		this.p1.setColor("");
		this.c_tahun = new saiCB(this.p1,{bound:[20,20,100,20],caption:"Tahun",readOnly:true, labelWidth:50,tag:2,change:[this,"doLoad"]}); 
		this.c_bulan = new saiCB(this.p1,{bound:[140,20,100,20],caption:"Bulan", labelWidth:50,items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2,change:[this,"doLoad"]});
		
		this.rP00 = new radioButton(this.p1,{bound:[320,20,300,20], caption:"In Progress", change:[this,"doSelectionChange"], selected:true});
		this.rP01 = new radioButton(this.p1,{bound:[420,20,300,20], caption:"Approval", change:[this,"doSelectionChange"], selected:false});
		this.rP02 = new radioButton(this.p1,{bound:[520,20,300,20], caption:"Return Vendor", change:[this,"doSelectionChange"], selected:false});
		
		this.sg = new saiGrid(this.p1,{bound:[1,21,this.p1.width-5,this.p1.height-65],colCount:7,tag:0,
		            colTitle:["Tgl Pesan","No Pesan","Nama Pesanan","Pemesan","Nilai","Vendor","Catatan Vendor"],
					colWidth:[[6,5,4,3,2,1,0],[180,180,100,200,270,100,100]],
					readOnly:true,
					colFormat:[[4],[cfNilai]],buttonStyle:[[0],[bsAuto]], 					
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});					
		this.p1.rearrangeChild(10, 23);
		
		this.p2 = new panel(this,{bound:[0,0,1020,555],caption:" ",visible:false});
		this.p2.setColor("");
		this.i_back = new portalui_imageButton(this.p2,{bound:[720,10,20,20],hint:"Back",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doBack"]});
		
		this.cb_vendor = new saiCBBL(this.p2,{bound:[20,10,200,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:2});				
		this.e_memo = new saiMemo(this.p2,{bound:[20,12,720,60],caption:"Catatan PO",tag:9,readOnly:true});
		this.e_tanggal = new saiLabelEdit(this.p2,{bound:[20,11,200,20],caption:"Tgl Pesanan",readOnly :true});						
		this.e_nb = new portalui_saiLabelEdit(this.p2,{bound:[20,12,200,20],caption:"No Pesanan",readOnly:true});		
		this.e_ket = new saiLabelEdit(this.p2,{bound:[20,11,450,20],caption:"Nama Pesanan",readOnly :true});						
		this.e_alamat = new saiLabelEdit(this.p2,{bound:[530,11,450,20],caption:"Alamat Penerima", readOnly :true});											
		this.e_peminta = new saiLabelEdit(this.p2,{bound:[20,12,450,20],caption:"NIK Pemesan", readOnly :true});						
		this.e_telp = new saiLabelEdit(this.p2,{bound:[530,12,450,20],caption:"No Telpon PIC", readOnly :true});								
		this.e_cc = new saiLabelEdit(this.p2,{bound:[20,13,450,20],caption:"Cost Center", readOnly :true});								
		this.e_nodin = new saiLabelEdit(this.p2,{bound:[530,13,450,20],caption:"Nota Dinas", readOnly :true});												
		this.e_akun = new saiLabelEdit(this.p2,{bound:[20,14,450,20],caption:"Kode Akun", readOnly :true});								
		this.e_catat = new saiLabelEdit(this.p2,{bound:[530,14,450,20],caption:"Keterangan", readOnly :true});												
		this.e_jenis = new saiLabelEdit(this.p2,{bound:[20,15,450,20],caption:"Jenis Barang", readOnly :true});								
		this.e_total = new saiLabelEdit(this.p2,{bound:[530,15,200,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ppn = new saiLabelEdit(this.p2,{bound:[780,15,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0"});		
		
		this.sg2 = new saiGrid(this.p2,{bound:[20,20,this.p2.width-59,this.p2.height-300],colCount:9,tag:9,
		            colTitle:["Kode Barang","Nama Barang","Spesifikasi","Satuan","Harga","Jumlah","Total","Due Date","Jam"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[50,80,80,80,70,50,240,160,80]],					
					readOnly:true,	
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[20,this.p2.height-25,this.p2.width-59,25],buttonStyle:3,grid:this.sg2});
				
		this.p2.rearrangeChild(10, 23);
				
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();

					
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select distinct substring(periode,1,4) as tahun from sc_pesan_m",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}	
			this.cb_vendor.setSQL("select kode_vendor, nama from sc_vendor",["kode_vendor","nama"],false,["Kode","Nama"],"where","Data Vendor",true);										
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_sc_transaksi_fPesanOrder.extend(window.childForm);
window.app_sc_transaksi_fPesanOrder.implement({
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
					this.nopo = this.standarLib.noBuktiOtomatis(this.dbLib,"sc_po_m","no_po",this.app._lokasi+"-PO"+this.periode.substr(2,2),"0000");
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into sc_po_m(no_po,tanggal,periode,keterangan,nik_buat,kode_vendor,kode_jenis,nilai,ppn,nik_user,tgl_input,catatan,no_bast,no_rekon,no_jurnal,no_pesan) values "+
						    "('"+this.nopo+"','"+this.dp_d1.getDateString()+"','"+this.periode+"','"+this.e_memo.getText()+"','"+this.app._userLog+"','"+this.cb_vendor.getText()+"','-',"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.app._userLog+"',getdate(),'-','-','-','-','"+this.e_nb.getText()+"')");
					
					sql.add("update sc_pesan_m set kode_vendor='"+this.cb_vendor.getText()+"',no_po='"+this.nopo+"',progress ='2',no_notif='-' where no_pesan='"+this.e_nb.getText()+"'");
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
					this.dataJU.rs.rows = [];
					this.doLoad();
					this.doBack();
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
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.periode = y+""+m;		
		this.c_tahun.setText(y); this.c_bulan.setText(m);				
		this.doLoad();
	},	
	doSelectionChange: function(sender, value){	
		this.doLoad();
	},	
	doLoad:function(sender){	
		var vPeriode = this.c_tahun.getText() + this.c_bulan.getText();
		if (this.rP00.isSelected()) {		
			this.filterProgress = " a.progress = '1' and a.no_po='-' "; 
			this.filterPeriode = " a.periode<='"+vPeriode+"' ";					
		}
		else{
			if (this.rP01.isSelected()) this.filterProgress = " a.progress in ('2','3') and a.no_po <> '-' "; 			
			this.filterPeriode = " a.periode='"+vPeriode+"' ";					
			if (this.rP02.isSelected()) this.filterProgress = " a.progress = 'N' and a.no_po <> '-' "; 			
			this.filterPeriode = " a.periode<='"+vPeriode+"' ";					
		}		
		var strSQL = "select convert(varchar,a.tanggal,103) as tanggal,a.no_pesan,a.keterangan,a.nik_buat+' - '+c.nama as pengaju,a.nilai,a.kode_vendor+' - '+isnull(d.nama,'-') as vendor,isnull(e.keterangan,'-') as ket_notif "+
					 "from sc_pesan_m a inner join sc_cc b on a.kode_cc=b.kode_cc "+
					 " 			        inner join sc_karyawan c on a.nik_buat=c.nik "+					 					 
					 "                  left join sc_vendor d on a.kode_vendor=d.kode_vendor "+					 
					 "                  left join sc_notif_m e on a.no_po=e.no_po "+					 
					 "where "+this.filterProgress+" and "+this.filterPeriode; 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);				
	},
	doTampilData: function(page) {
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.tanggal,line.no_pesan,line.keterangan,line.pengaju,floatToNilai(line.nilai),line.vendor,line.ket_notif]);
		}
		this.sg.setNoUrut(start);
	},		
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		this.p1.setVisible(false);
		this.p2.setVisible(true);
		
		this.sg2.clear(); 
		var strSQL = "select convert(varchar,a.tanggal,103) as tanggal,a.no_pesan,a.keterangan,a.alamat,a.nik_buat+' - '+b.nama as nama_buat,a.no_tel,a.kode_cc+' - '+c.nama as nama_cc,a.nodin,a.kode_akun+' - '+d.nama as nama_akun,a.catatan,a.kode_jenis+' - '+e.nama as nama_jenis,a.nilai,a.kode_vendor,isnull(f.keterangan,'-') as catatan,isnull(g.nama,'-') as nama_vendor,isnull(f.ppn,0) as ppn,a.progress "+
					 "from sc_pesan_m a inner join sc_karyawan b on a.nik_buat=b.nik "+
					 "                  inner join sc_cc c on a.kode_cc=c.kode_cc "+
					 "                  inner join masakun d on a.kode_akun=d.kode_akun "+
					 "                  inner join sc_jenis e on a.kode_jenis=e.kode_jenis "+					 					 
					 "                  left join sc_po_m f on a.no_po=f.no_po "+
					 "                  left join sc_vendor g on a.kode_vendor=g.kode_vendor "+					 
					 "where a.no_pesan='"+this.sg.cells(1,row) +"' ";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];				
			if (line.progress == "1" || line.progress == "2" || line.progress == "N") {
				this.e_memo.setReadOnly(false);				
				if (line.progress == "1" || line.progress == "N") setTipeButton(tbSimpan);			
				if (line.progress == "2") setTipeButton(tbUbahHapus);			
			}
			else  {
				this.e_memo.setReadOnly(true);				
				setTipeButton(tbAllFalse);
			}			
			this.cb_vendor.setText(line.kode_vendor,line.nama_vendor);							
			this.e_memo.setText(line.catatan);	
			this.e_tanggal.setText(line.tanggal);	
			this.e_nb.setText(line.no_pesan);	
			this.e_ket.setText(line.keterangan);	
			this.e_alamat.setText(line.alamat);	
			this.e_peminta.setText(line.nama_buat);	
			this.e_telp.setText(line.no_tel);	
			this.e_cc.setText(line.nama_cc);	
			this.e_nodin.setText(line.nodin);	
			this.e_akun.setText(line.nama_akun);	
			this.e_catat.setText(line.catatan);	
			this.e_jenis.setText(line.nama_jenis);	
			this.e_total.setText(floatToNilai(line.nilai));				
			if (line.nama_vendor == "-") this.e_ppn.setText(floatToNilai(Math.round(parseFloat(line.nilai) * 10/100)));	 //artinya data inprog
			else this.e_ppn.setText(floatToNilai(line.ppn));							
		}		
		var strSQL = "select a.kode_brg,b.nama as nama_brg,b.tipe,b.satuan,a.harga,a.jumlah,(a.jumlah*a.harga) as total,convert(varchar,due_date,103) as due_date,a.jam "+
					 "from sc_pesan_d a inner join sc_barang b on a.kode_brg=b.kode_brg where a.no_pesan='"+this.sg.cells(1,row) +"' order by a.no_urut";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_brg,line.nama_brg,line.tipe,line.satuan,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.total),line.due_date,line.jam]);
			}
		} else this.sg2.clear(1);				
	},
	doBack:function(sender){	
		this.p1.setVisible(true);
		this.p2.setVisible(false);
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan","");
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
