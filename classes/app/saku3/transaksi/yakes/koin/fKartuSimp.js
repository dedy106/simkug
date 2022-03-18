window.app_saku3_transaksi_yakes_koin_fKartuSimp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_koin_fKartuSimp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_koin_fKartuSimp";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kartu Simpanan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Kartu","Daftar Kartu"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:9,
		            colTitle:["No Kartu","No Agg","Nama","Jenis","Nilai","P Bunga","Tgl Awal Tag","Sts Bayar"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,100,100,100,100,250,100,100]],
					readOnly:true,colFormat:[[4,5],[cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad1"]});		
		
		this.cb_agg = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"Anggota",tag:1, multiSelection:false, change:[this,"doChange"]});
		this.cb_simp = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Kode Simp",tag:1, multiSelection:false, change:[this,"doChange"]});
		this.e_jenis = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Jenis",readOnly:true,tag:1});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Kartu",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.l_tgl = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai Tagihan", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],date:new Date().getDateStr()});
		this.cb_piutang = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Piutang Simpanan",readOnly:true, tag:2});
		this.cb_titip = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Akun Simpanan",readOnly:true, tag:2});
		this.cb_status = new portalui_saiCB(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Status Bayar",items:["PGAJI","TUNAI"],tag:2,readOnly:true});
		this.e_nilai = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai Simpanan",maxLength:15,tipeText:ttNilai,text:"0"});		
		this.e_bunga = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"% Jasa/Thn",maxLength:15,tipeText:ttNilai,text:"0"});		
		this.c_flag = new saiCB(this.pc1.childPage[0],{bound:[20,22,200,20],caption:"Flag Aktif",items:["1. AKTIF","0. TIDAK"], readOnly:true,tag:2});	
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.cb_simp.setSQL("select kode_param,nama from kop_simp_param where kode_lokasi = '"+this.app._lokasi+"'",["kode_param","nama"],false,["Kode","Nama"],"and","Data Jenis Simpanan",true);
			this.cb_agg.setSQL("select no_agg,nama from kop_agg where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["no_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);						
			this.cb_piutang.setSQL("select kode_akun,nama from masakun where kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_titip.setSQL("select kode_akun,nama from masakun where kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_koin_fKartuSimp.extend(window.portalui_childForm);
window.app_saku3_transaksi_yakes_koin_fKartuSimp.implement({
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) sql.add("delete from kop_simp_m where no_simp = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					var thnBln = this.dp_d1.getDateString().substr(0,4) + this.dp_d1.getDateString().substr(5,2);
					sql.add("insert into kop_simp_m (no_simp,kode_lokasi,no_agg,kode_param,jenis,nilai,p_bunga,tgl_tagih,status_bayar,periode_gen,flag_aktif,nik_user,tgl_input,periode_bunga) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_agg.getText()+"','"+this.cb_simp.getText()+"','"+this.e_jenis.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_bunga.getText())+",'"+this.dp_d1.getDateString()+"','"+this.cb_status.getText()+"','"+thnBln+"','"+this.c_flag.getText().substr(0,1)+"','"+this.app._userLog+"',getdate(),'"+thnBln+"')");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);							
				}
				break;
			
			case "simpan" :	
			case "ubah" :	this.simpan();
				break;
			
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from kop_simp_m where no_simp = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);								
				break;				
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_agg && this.cb_agg.getText()!=""&& this.stsSimpan == 1) this.e_nb.setText("");			
			if (sender == this.cb_simp && this.cb_simp.getText()!="" && this.stsSimpan == 1) {
				this.e_nb.setText("");
				var strSQL = "select akun_piutang,akun_titip,jenis,nilai,p_bunga "+
				             "from kop_simp_param  "+						     
							 "where kode_param='"+this.cb_simp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_jenis.setText(line.jenis);												
						this.cb_piutang.setText(line.akun_piutang);						
						this.cb_titip.setText(line.akun_titip);						
						this.e_nilai.setText(floatToNilai(line.nilai));						
						this.e_bunga.setText(floatToNilai(line.p_bunga));																								
					}
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClick:function(sender){
		try {			
			var thn = this.dp_d1.getDateString().substr(2,2);
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simp_m","no_simp",this.app._lokasi+"-"+this.e_jenis.getText()+this.cb_agg.getText()+".","00"));		
		    this.dp_d1.setFocus();
			setTipeButton(tbSimpan);
		}
		catch (e) {
			alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	doLoad1:function(sender){																		
		if (this.cb_agg.getText() == "") var filter = ""; else var filter = "a.no_agg = '"+this.cb_agg.getText()+"' and ";
		var strSQL = "select a.no_simp,a.no_agg,c.nama,a.jenis,a.nilai,a.p_bunga,convert(varchar,a.tgl_tagih,103) as tgl,a.status_bayar "+
		             "from kop_simp_m a inner join kop_simp_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "                  inner join kop_agg c on a.no_agg=c.no_agg and a.kode_lokasi=c.kode_lokasi "+
					 "where "+filter+" a.kode_lokasi='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU1 = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData1(1);
		} else this.sg1.clear(1);			
	},
	doTampilData1: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg1.appendData([line.no_simp,line.no_agg,line.nama,line.jenis,floatToNilai(line.nilai),floatToNilai(line.p_bunga),line.tgl,line.status_bayar]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg1.cells(0,row));								
								
				var strSQL = "select * "+
							 "from kop_simp_m "+							 
							 "where no_simp = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.cb_agg.setText(line.no_agg);
						this.cb_simp.setText(line.kode_param);
						this.e_jenis.setText(line.jenis);					
						this.dp_d1.setText(line.tgl_tagih);
						this.cb_status.setText(line.status_bayar);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_bunga.setText(floatToNilai(line.p_bunga));
						if (line.flag_aktif == "1") this.c_flag.setText("1. AKTIF");
						else this.c_flag.setText("0. TIDAK");	
						
						var strSQL = "select akun_piutang,akun_titip "+
									 "from kop_simp_param  "+						     
									 "where kode_param='"+this.cb_simp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){														
								this.cb_piutang.setText(line.akun_piutang);						
								this.cb_titip.setText(line.akun_titip);														
							}
						}
						
					}
				}												
			}									
		} catch(e) {alert(e);}
	}
});