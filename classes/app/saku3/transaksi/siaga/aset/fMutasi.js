window.app_saku3_transaksi_siaga_aset_fMutasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_aset_fMutasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_aset_fMutasi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Mutasi Aktiva Tetap", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label");
		uses("saiGrid",true);				
		
		this.pc1 = new pageControl(this,{bound:[10,10,1000,450],childPage:["Data Mutasi","Riwayat Mutasi"]});
		this.cb_id = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"ID Aset",maxLength:10,multiSelection:false, change:[this,"doChange"]});
		this.e_pnjlama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,350,20],caption:"Pnj Lama",readOnly:true,tag:1});
		this.e_loklama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,350,20],caption:"Lokasi Lama",readOnly:true,tag:1});
		this.e_stslama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Status Lama",readOnly:true,tag:1});
		this.e_tglLama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Tgl Berlaku", readOnly:true,tag:9});		

		this.l_tgl = new portalui_label(this.pc1.childPage[0],{bound:[20,16,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,16,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		
		this.e_pnj = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,26,350,20],caption:"Penanggungjawab",maxLength:50,tag:1});				
		this.e_lokasi = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,350,20],caption:"Lokasi Aktual",maxLength:100,tag:1});				
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,24,200,20],caption:"Status",items:["Berfungsi","Tidak Layak Pakai","Rusak"], readOnly:true,tag:2});

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],readOnly:true,colCount:7,tag:9,
				colTitle: ["Tgl Mulai","Tgl Selesai","No Bukti","PenanggungJawab","Lokasi Aktual","Status","Flag"],		
				colWidth:[[6,5,4,3,2,1,0],[120,200,200,200,150,80,80]],
				readOnly:true,
				dblClick:[this,"doDoubleClick"],
				autoAppend:false,defaultRow:1});
		this.sgn1 =  new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		


		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);					

		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_id.setSQL("select id_aset, nama from am_aset ",["id_aset","nama"],false,["ID","Nama"],"and","Data Aset",true);
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_aset_fMutasi.extend(window.childForm);
window.app_saku3_transaksi_siaga_aset_fMutasi.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					var id = this.standarLib.noBuktiOtomatis(this.dbLib,"am_mutasi","no_bukti",this.app._lokasi+"-MT"+this.periode.substr(2,4)+".","0000")
					
					var d = new Date();
					var d1 = d.strToDate(this.dp_d1.getText());
					var d2 = d1.DateSub("d",1);			
					var tglAkhir = d2.getDateStr();
					
					sql.add("update am_mutasi set tgl_akhir='"+tglAkhir+"',flag_seb='"+id+"' where id_aset='"+this.cb_id.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_seb='-'");																				
					sql.add("insert into am_mutasi(no_bukti,tgl_input,nik_user,id_aset,kode_lokasi,tgl_awal,tgl_akhir,pnj,lokasi,status,form,flag_seb) values "+
							"('"+id+"',getdate(),'"+this.app._userLog+"','"+this.cb_id.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','2099-12-31','"+this.e_pnj.getText()+"','"+this.e_lokasi.getText()+"','"+this.c_status.getText()+"','MUTASI','-')");

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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update am_mutasi set pnj='"+this.e_pnj.getText()+"',lokasi='"+this.e_lokasi.getText()+"',status='"+this.c_status.getText()+"'  "+
							"where no_bukti='"+this.no_bukti+"' and id_aset='"+this.cb_id.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					sql.add("update am_mutasi set tgl_akhir='2099-12-31',flag_seb='-' where flag_seb='"+this.no_bukti+"' and id_aset='"+this.cb_id.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_seb='-'");																									
					sql.add("delete from am_mutasi where no_bukti = '"+this.no_bukti+"' and id_aset = '"+this.cb_id.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
								
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_id);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				var strSQL = "select top 1 convert(varchar,tgl_awal,103)  as tgl_mulai "+
						 	 "from am_mutasi "+
							 "where id_aset='"+this.cb_id.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir and tgl_akhir <> '2099-12-31' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){						
					var line = data.rs.rows[0];							
					if (line != undefined){					
						system.alert(this,"Transaksi tidak valid.","Tanggal dalam range mutasi yang lain.");
						return false;
					}
					else this.simpan();
				}
				else this.simpan();
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = (y+""+m);	
		
	},
	doChange: function(sender){
		try{
			
			if (sender == this.cb_id){
				if (this.cb_id.getText() != "") {
					var strSQL = "select top 1 convert(varchar,tgl_awal,103)  as tgl_mulai,pnj,lokasi,status "+
								 "from am_mutasi "+
								 "where id_aset='"+this.cb_id.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by tgl_awal desc";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){						
						var line = data.rs.rows[0];							
						if (line != undefined){					
							this.e_pnjlama.setText(line.pnj);
							this.e_loklama.setText(line.lokasi);
							this.e_stslama.setText(line.status);
							this.e_tglLama.setText(line.tgl_mulai);							
						} 
						else {
							this.e_pnjlama.setText("-");
							this.e_loklama.setText("-");
							this.e_stslama.setText("-");
							this.e_tglLama.setText("-");
						}
					}
					this.doLoad();	
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doLoad:function(sender){				
		var strSQL = "select a.no_bukti,a.tgl_awal,convert(varchar,a.tgl_awal,103) as tgl1,convert(varchar,a.tgl_akhir,103) as tgl2 "+
					 ",a.pnj,a.lokasi,a.status,a.flag_seb "+
					 "from am_mutasi a "+					 
					 "where a.id_aset='"+this.cb_id.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.tgl_awal desc";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "" && this.sg1.cells(6,row) == "-") {		
				setTipeButton(tbUbahHapus);

				this.pc1.setActivePage(this.pc1.childPage[0]);
				var strSQL = "select * from am_mutasi "+
							 "where no_bukti='"+ this.sg1.cells(2,row)+"' and kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){						
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_pnj.setText(line.pnj);
						this.e_lokasi.setText(line.lokasi);
						this.c_status.setText(line.status);
						this.no_bukti = line.no_bukti;									
					} 
					
				}											
			}
		} catch(e) {alert(e);}
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];	
			this.sg1.appendData([line.tgl1,line.tgl2,line.no_bukti,line.pnj,line.lokasi,line.status,line.flag_seb]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{							
							system.info(this,"Transaksi telah sukses tersimpan (ID Aset : "+ this.cb_id.getText()+")","");	
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
	}
});