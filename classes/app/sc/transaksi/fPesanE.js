window.app_sc_transaksi_fPesanE = function(owner)
{
	if (owner)
	{
		window.app_sc_transaksi_fPesanE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_sc_transaksi_fPesanE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pemesanan: Edit", 0);	
		
		uses("radioButton;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;saiMemo");		
		this.dp_d1 = new portalui_datePicker(this,{bound:[0,1,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		
		this.p1 = new panel(this,{bound:[0,0,1020,555],caption:" ",visible:true});
		this.p1.setColor("");
		this.c_tahun = new saiCB(this.p1,{bound:[20,20,100,20],caption:"Tahun",readOnly:true, labelWidth:50,tag:2,change:[this,"doLoad"]}); 
		this.c_bulan = new saiCB(this.p1,{bound:[140,20,100,20],caption:"Bulan", labelWidth:50,items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2,change:[this,"doLoad"]});
		
		this.rP00 = new radioButton(this.p1,{bound:[320,20,300,20], caption:"In Progress", change:[this,"doSelectionChange"], selected:true});
		this.rP01 = new radioButton(this.p1,{bound:[420,20,300,20], caption:"Approval", change:[this,"doSelectionChange"], selected:false});
		this.rP02 = new radioButton(this.p1,{bound:[520,20,300,20], caption:"Return", change:[this,"doSelectionChange"], selected:false});
		
		this.sg = new saiGrid(this.p1,{bound:[1,21,this.p1.width-5,this.p1.height-65],colCount:7,tag:0,
		            colTitle:["Tgl Pesan","No Pesan","Nama Pesanan","Pemesan","Nilai","Status","Vendor"],
					colWidth:[[6,5,4,3,2,1,0],[100,80,100,200,270,100,100]],
					readOnly:true,
					colFormat:[[4],[cfNilai]],buttonStyle:[[0],[bsAuto]], 					
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});					
		this.p1.rearrangeChild(10, 23);
		
		this.p2 = new panel(this,{bound:[0,0,1020,555],caption:" ",visible:false});
		this.p2.setColor("");
		this.i_back = new portalui_imageButton(this.p2,{bound:[720,10,20,20],hint:"Back",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doBack"]});
		
		this.e_status = new saiLabelEdit(this.p2,{bound:[20,10,220,20],caption:"Status Approval",readOnly:true});						
		
		this.e_memo = new saiMemo(this.p2,{bound:[20,12,720,60],caption:"Catatan Approval",tag:9,readOnly:true});		
		this.e_periode = new portalui_saiLabelEdit(this.p2,{bound:[20,12,200,20],caption:"Periode",readOnly:true,visible:false});		
		this.l_tgl1 = new portalui_label(this.p2,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.p2,{bound:[120,11,100,18]}); 				
		this.e_nb = new portalui_saiLabelEdit(this.p2,{bound:[20,12,200,20],caption:"No Pesanan",readOnly:true});		
		this.e_ket = new saiLabelEdit(this.p2,{bound:[20,11,450,20],caption:"Nama Pesanan",maxLength:200});						
		this.e_alamat = new saiLabelEdit(this.p2,{bound:[530,11,450,20],caption:"Alamat Penerima", maxLength:200});											
		this.e_peminta = new saiLabelEdit(this.p2,{bound:[20,12,450,20],caption:"NIK Pemesan", readOnly :true});						
		this.e_telp = new saiLabelEdit(this.p2,{bound:[530,12,450,20],caption:"No Telpon PIC", maxLength:30});								
		this.e_cc = new saiLabelEdit(this.p2,{bound:[20,13,450,20],caption:"Cost Center", readOnly :true});								
		this.e_nodin = new saiLabelEdit(this.p2,{bound:[530,13,420,20],caption:"Nota Dinas", maxLength:50});												
		this.i_attach = new portalui_imageButton(this.p2,{bound:[960,13,20,20],hint:"Attach",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doAttach"]});
		this.cb_akun = new saiCBBL(this.p2,{bound:[20,14,200,20],caption:"Kode Akun", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_catat = new saiLabelEdit(this.p2,{bound:[530,14,450,20],caption:"Keterangan" , maxLength:200});														
		this.cb_jenis = new saiCBBL(this.p2,{bound:[20,15,200,20],caption:"Jenis Barang", multiSelection:false, maxLength:10,change:[this,"doChange"]});								
		this.e_total = new saiLabelEdit(this.p2,{bound:[780,15,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.sg2 = new saiGrid(this.p2,{bound:[20,20,this.p2.width-59,this.p2.height-400],colCount:9,tag:0,
		            colTitle:["Kode Barang","Nama Barang","Spesifikasi","Satuan","Harga","Jumlah","Total","Due Date","Jam"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[50,80,80,80,70,50,240,160,80]],					
					columnReadOnly:[true,[6,4,3,2,1,0],[5,7,8]],
					buttonStyle:[[0,7,8],[bsEllips,bsDate,bsAuto]],
					picklist:[[8],[new portalui_arrayMap({items:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]})]],
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],					
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[20,this.p2.height-25,this.p2.width-59,25],buttonStyle:2,grid:this.sg2});
		this.i_gar = new portalui_imageButton(this.sgn2,{bound:[935,3,20,20],hint:"Hitung Gar",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.sg3 = new saiGrid(this.p2,{bound:[20,20,this.p2.width-59,100],colCount:6,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Periode","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[5,4,3,2,1,0],[200,170,200,80,160,80]],
					readOnly:true,colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});		
		
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
			this.cb_jenis.setSQL("select kode_jenis, nama from sc_jenis",["kode_jenis","nama"],false,["Kode","Nama"],"where","Data Jenis Barang",true);
			this.cb_akun.setSQL("select kode_akun, nama from masakun",["kode_akun","nama"],false,["Kode","Nama"],"where","Data Akun",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_sc_transaksi_fPesanE.extend(window.childForm);
window.app_sc_transaksi_fPesanE.implement({
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
					if (this.progress == "0" || this.progress == "R") {
						sql.add("delete from sc_pesan_m where no_pesan = '"+this.e_nb.getText()+"'");
						sql.add("delete from sc_pesan_d where no_pesan = '"+this.e_nb.getText()+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"'");					
						
						sql.add("insert into sc_pesan_m(no_pesan,keterangan,periode,tanggal,kode_cc,nik_buat,kode_jenis,no_app,nik_user,tgl_input,nilai,kode_akun,progress,nodin,alamat,no_tel,catatan,no_po,no_notif,no_terima,kode_vendor) values "+
								"('"+this.e_nb.getText()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.kodecc+"','"+this.peminta+"','"+this.cb_jenis.getText()+"','-','"+this.app._userLog+"',getdate(),"+parseNilai(this.e_total.getText())+",'"+this.cb_akun.getText()+"','0','"+this.e_nodin.getText()+"','"+this.e_alamat.getText()+"','"+this.e_telp.getText()+"','"+this.e_catat.getText()+"','-','-','-','-')");					
						
						if (this.sg2.getRowValidCount() > 0){
							for (var i=0;i < this.sg2.getRowCount();i++){
								if (this.sg2.rowValid(i)){
									sql.add("insert into sc_pesan_d(no_pesan,no_urut,kode_brg,harga,jumlah,due_date,jam,no_po,no_terima,periode_gar,kode_vendor,catat_terima) values "+
											"	('"+this.e_nb.getText()+"',"+i+",'"+this.sg2.cells(0,i)+"',"+parseNilai(this.sg2.cells(4,i))+","+parseNilai(this.sg2.cells(5,i))+",'"+this.sg2.getCellDateValue(7,i)+"','"+this.sg2.cells(8,i)+"','-','-','"+this.sg2.getThnBln(7,i)+"','-','-')");
								}						
							}
						}									
						if (this.sg3.getRowValidCount() > 0){
							for (var i=0;i < this.sg3.getRowCount();i++){
								if (this.sg3.rowValid(i)){																
									sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"	('"+this.e_nb.getText()+"','PESAN','"+this.app._lokasi+"','"+this.sg3.cells(0,i)+"','"+this.kodecc+"','-','"+this.sg3.cells(2,i)+"','"+this.e_periode.getText()+"','D',"+parseNilai(this.sg3.cells(3,i))+","+parseNilai(this.sg3.cells(4,i))+")");
								}
							}
						}
					}
					if (this.progress == "3") {
						this.noterima = this.standarLib.noBuktiOtomatis(this.dbLib,"sc_terima_m","no_terima",this.app._lokasi+"TR"+this.periode.substr(2,2),"0000");
						sql.add("insert into sc_terima_m(no_terima,tanggal,keterangan,periode,nik_buat,nik_user,tgl_input,jam_terima,no_pesan) values "+
								"('"+this.noterima+"',getdate(),'-','"+this.periode+"','"+this.app._userLog+"','"+this.app._userLog+"',getdate(),1,'"+this.e_nb.getText()+"')");
						sql.add("update sc_pesan_m set no_terima='"+this.noterima+"',progress='4' where no_pesan='"+this.e_nb.getText()+"'");
					}					
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
			case "ubah" :													
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;					
			case "hapus" :	
				this.hapus();
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
			this.filterProgress = " (a.progress = '0' and a.no_app='-') or (a.progress ='3')  "; 
			this.filterPeriode = " a.periode<='"+vPeriode+"' ";					
		}
		else{
			if (this.rP01.isSelected()) this.filterProgress = " a.progress in ('1','2','X','N','4') ";
			this.filterPeriode = " a.periode='"+vPeriode+"' ";					
			if (this.rP02.isSelected()) this.filterProgress = " a.progress = 'R' ";
			this.filterPeriode = " a.periode<='"+vPeriode+"' ";					
		}		
		var strSQL = "select convert(varchar,a.tanggal,103) as tanggal,a.no_pesan,a.keterangan,a.nik_buat+' - '+c.nama as pengaju,a.nilai,"+
		             "case a.progress when '0' then 'INPROG' "+
					 "                when '1' then 'APPROVE' "+
					 "                when 'X' then 'REJECT' "+
					 "                when 'R' then 'RETURN' "+
					 "                when '2' then 'PO' "+
					 "                when 'N' then 'RETURN PO' "+
					 "                when '3' then 'NOTIF PO' "+
					 "                when '4' then 'TERIMA' "+
					 "       end as status, "+
					 "d.kode_vendor+' - '+isnull(d.nama,'-') as vendor "+
					 "from sc_pesan_m a inner join sc_cc b on a.kode_cc=b.kode_cc "+
					 " 			        inner join sc_karyawan c on a.nik_buat=c.nik "+					 
					 "                  left join sc_vendor d on a.kode_vendor=d.kode_vendor "+
					 "where "+this.filterProgress+" and "+this.filterPeriode; //belum proteksi ... kode_cc = '"+this.app._kodePP+"'									 				
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
			this.sg.appendData([line.tanggal,line.no_pesan,line.keterangan,line.pengaju,floatToNilai(line.nilai),line.status.toUpperCase(),line.vendor]);
		}
		this.sg.setNoUrut(start);
	},		
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		this.p1.setVisible(false);
		this.p2.setVisible(true);
		
		this.sg2.clear(); this.sg3.clear();
		var strSQL = "select convert(varchar,a.tanggal,103) as tanggal,a.no_pesan,a.keterangan,a.alamat,a.nik_buat+' - '+b.nama as nama_buat,a.no_tel,a.kode_cc+' - '+c.nama as nama_cc,a.nodin,a.kode_akun,d.nama as nama_akun,a.catatan,a.kode_jenis,e.nama as nama_jenis,a.nilai,isnull(f.catatan,'-') as memo,a.progress,a.kode_cc,a.nik_buat,a.periode "+
					 "from sc_pesan_m a inner join sc_karyawan b on a.nik_buat=b.nik "+
					 "                  inner join sc_cc c on a.kode_cc=c.kode_cc "+
					 "                  inner join masakun d on a.kode_akun=d.kode_akun "+
					 "                  inner join sc_jenis e on a.kode_jenis=e.kode_jenis "+
					 "                  left join sc_ver_d f on f.no_bukti=a.no_pesan and f.no_ver=a.no_app "+
					 "                   "+
					 "where a.no_pesan='"+this.sg.cells(1,row) +"' ";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];			
			this.progress = line.progress;
			if (line.progress != "0") {
				this.e_memo.setReadOnly(true);
				if (line.progress == "1") this.e_status.setText("APPROVE");
				if (line.progress == "R") this.e_status.setText("RETURN");
				if (line.progress == "X") this.e_status.setText("REJECT");
				if (line.progress == "2") this.e_status.setText("PO");
				if (line.progress == "N") this.e_status.setText("RETUR PO");	
				if (line.progress == "3") this.e_status.setText("NOTIF PO");				
				if (line.progress == "4") this.e_status.setText("TERIMA");				
			}
			else {
				this.e_memo.setReadOnly(false);
				if (line.progress == "0") this.e_status.setText("INPROGRESS");				
			}
			if (line.progress == "0" || line.progress == "R") setTipeButton(tbUbahHapus);
			if (line.progress == "1" || line.progress == "X" || line.progress == "2" || line.progress == "N" || line.progress == "4") 
			   setTipeButton(tbAllFalse);
			if (line.progress == "3" ) setTipeButton(tbSimpan);
			
			this.kodecc = line.kode_cc;
			this.peminta = line.nik_buat;
			this.e_memo.setText(line.memo);				
			this.dp_d1.setText(line.tanggal);	
			this.e_periode.setText(line.periode);				
			this.e_nb.setText(line.no_pesan);	
			this.e_ket.setText(line.keterangan);	
			this.e_alamat.setText(line.alamat);	
			this.e_peminta.setText(line.nama_buat);	
			this.e_telp.setText(line.no_tel);	
			this.e_cc.setText(line.nama_cc);	
			this.e_nodin.setText(line.nodin);	
			this.cb_akun.setText(line.kode_akun,line.nama_akun);	
			this.e_catat.setText(line.catatan);	
			this.cb_jenis.setText(line.kode_jenis,line.nama_jenis);	
			this.e_total.setText(floatToNilai(line.nilai));				
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
		var strSQL = "select a.kode_akun,b.nama,a.periode1,a.saldo,a.nilai, a.saldo-a.nilai as sak "+
					 "from angg_r a inner join masakun b on a.kode_akun=b.kode_akun where a.no_bukti='"+this.sg.cells(1,row) +"' ";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg3.appendData([line.kode_akun,line.nama,line.periode1,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sak)]);
			}
		} else this.sg3.clear(1);					
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
	},	
	doChange:function(sender){
		try {
		if (sender == this.cb_jenis && this.cb_jenis.getText()!="") {			
			var data = this.dbLib.getDataProvider("select status_nodin from sc_jenis where kode_jenis='"+this.cb_jenis.getText()+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				if (line.status_nodin == "TIDAK") {
					this.e_nodin.setReadOnly = true;
				} 
				else {
					this.e_nodin.setReadOnly = false;
				}
			}			
		}
		} catch(e) {
		alert(e);}
	},
	doChangeCell: function(sender, col, row){		
		if ((col ==0) && (this.sg2.cells(0,row) != "")) {
			var data = this.dbLib.getDataProvider("select tipe,satuan,harga from sc_barang where kode_brg = '"+this.sg2.cells(0,row)+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];
				this.sg2.cells(2,row,line.tipe);
				this.sg2.cells(3,row,line.satuan);
				this.sg2.cells(4,row,floatToNilai(line.harga));				
				if (this.sg2.cells(5,row) != "") {
					var total = nilaiToFloat(this.sg2.cells(4,row)) * nilaiToFloat(this.sg2.cells(5,row));
					this.sg2.cells(6,row,floatToNilai(total));				
				}
				this.sg2.validasi();
			}
		}
		if ((col == 5) && (this.sg2.cells(5,row) != "") && (this.sg2.cells(4,row) != "")) {
			var total = nilaiToFloat(this.sg2.cells(4,row)) * nilaiToFloat(this.sg2.cells(5,row));
			this.sg2.cells(6,row,floatToNilai(total));				
			this.sg2.validasi();
		}		
	},
	doNilaiChange: function(){
		try{			
			var tot=0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(6,i) != ""){				
					tot += nilaiToFloat(this.sg2.cells(6,i));										
				}
			}
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 7 : 
					this.sg2.setCell(7,row,this.dp_d1.getText());					
				break;			
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{						
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Barang",sender,undefined, 
												  "select kode_brg,nama   from sc_barang where kode_jenis = '"+this.cb_jenis.getText()+"'",
												  "select count(kode_brg) from sc_barang where kode_jenis = '"+this.cb_jenis.getText()+"'",
												  ["kode_brg","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},				
	doHitungGar: function(){
		this.sg3.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.sg2.rowValid(i)){				
				nilai = nilaiToFloat(this.sg2.cells(6,i));				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg3.getRowCount();j++){					
					if (this.sg2.getThnBln(7,i) == this.sg3.cells(1,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg3.appendData([this.cb_akun.getText(),this.cb_akun.rightLabelCaption,this.sg2.getThnBln(7,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg3.cells(3,idx));
					total = total + nilai;
					this.sg3.setCell(3,idx,total);
				}
			}
		}		
		var sls = 0;
		for (var i=0;i < this.sg3.getRowCount();i++){						
			var data = this.dbLib.getDataProvider("select fn_cekagg6('"+this.kodecc+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','-','"+this.sg3.cells(2,i)+"','"+this.e_nb.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg3.cells(3,i,floatToNilai(sls));	
				sls = sls - nilaiToFloat(this.sg3.cells(4,i));
				this.sg3.cells(5,i,floatToNilai(sls));				
			}			
		}			
	}	
});
